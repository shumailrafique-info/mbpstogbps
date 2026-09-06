"use client";

import { RotateCcwIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { formatBytes, formatNumber } from "@/lib/converters/format";
import { SPEED_TIERS, STREAMING_PROFILES } from "@/lib/converters/presets";
import { convert } from "@/lib/converters/units";
import { Counter, Segmented } from "./controls";
import { DataTable, Note, Readout, Stat, StatGrid, ToolPanel } from "./readout";

const HEADROOM = [
  { value: "0", label: "No headroom" },
  { value: "0.25", label: "+25%" },
  { value: "0.5", label: "+50%" },
] as const;

const DEFAULT_STREAMS: Record<string, number> = {
  "netflix-4k": 1,
  "youtube-1080": 1,
  "zoom-hd": 1,
};

const SERVICES = [...new Set(STREAMING_PROFILES.map((item) => item.service))];

function recommendedPlan(mbps: number) {
  const tier = SPEED_TIERS.find((item) => item.mbps >= mbps);
  return tier ? tier.mbps : Math.ceil(mbps / 1000) * 1000;
}

/**
 * Adds up every screen in the house.
 *
 * Streams are additive in a way most other traffic is not - two 4K films at
 * once really do need twice the bandwidth - so counting them is the honest way
 * to size a connection.
 */
export function StreamingBandwidthCalculator() {
  const [streams, setStreams] =
    useState<Record<string, number>>(DEFAULT_STREAMS);
  const [headroom, setHeadroom] = useState<string>("0.25");

  const setCount = (id: string, next: number) =>
    setStreams((current) => ({ ...current, [id]: next }));

  const selected = useMemo(
    () =>
      STREAMING_PROFILES.filter(
        (profile) => (streams[profile.id] ?? 0) > 0,
      ).map((profile) => ({
        ...profile,
        count: streams[profile.id] ?? 0,
        total: (streams[profile.id] ?? 0) * profile.mbps,
      })),
    [streams],
  );

  const rawTotal = selected.reduce((sum, item) => sum + item.total, 0);
  const withHeadroom = rawTotal * (1 + Number(headroom));
  const streamCount = selected.reduce((sum, item) => sum + item.count, 0);
  const plan = recommendedPlan(withHeadroom);

  // One hour of everything running at once, in bytes.
  const hourlyBits = rawTotal * 1e6 * 3600;

  return (
    <div className="space-y-4">
      <ToolPanel>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
              What is playing right now
            </p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Count every screen that could be running at the same moment.
            </p>
          </div>
          <div className="flex items-end gap-2">
            <Segmented
              label="Headroom"
              value={headroom}
              onChange={setHeadroom}
              options={HEADROOM}
              className="w-56"
            />
            <button
              type="button"
              onClick={() => setStreams(DEFAULT_STREAMS)}
              aria-label="Reset the stream counts"
              className="grid size-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <RotateCcwIcon aria-hidden className="size-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <div key={service}>
              <h3 className="mb-2 border-b border-border pb-1.5 text-sm font-semibold text-foreground">
                {service}
              </h3>
              <ul className="grid gap-1.5">
                {STREAMING_PROFILES.filter(
                  (profile) => profile.service === service,
                ).map((profile) => (
                  <li
                    key={profile.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="min-w-0 text-[13px] text-muted-foreground">
                      <span className="text-foreground">{profile.quality}</span>
                      <span className="ml-1.5 font-mono text-[11px]">
                        {profile.mbps} Mbps
                      </span>
                    </span>
                    <Counter
                      label={`${profile.service} ${profile.quality} streams`}
                      value={streams[profile.id] ?? 0}
                      onChange={(next) => setCount(profile.id, next)}
                      max={20}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ToolPanel>

      <Readout
        label="Bandwidth needed"
        value={formatNumber(withHeadroom, 1)}
        unit="Mbps"
        copyValue={`${formatNumber(withHeadroom, 1)} Mbps`}
        caption={`${streamCount} simultaneous ${streamCount === 1 ? "stream" : "streams"} totalling ${formatNumber(rawTotal, 1)} Mbps, plus ${Math.round(Number(headroom) * 100)}% headroom.`}
      />

      <StatGrid>
        <Stat
          label="Plan to buy"
          value={`${formatNumber(plan, 0)} Mbps`}
          hint={
            plan >= 1000
              ? `${formatNumber(plan / 1000, 1)} Gbps`
              : "Next tier up"
          }
        />
        <Stat
          label="In megabytes"
          value={`${formatNumber(convert(withHeadroom, "mbps", "mbyteps"), 1)} MB/s`}
          hint="Combined throughput"
        />
        <Stat
          label="Data per hour"
          value={formatBytes(hourlyBits, 1)}
          hint="Everything running at once"
        />
        <Stat
          label="Heaviest stream"
          value={
            selected.length > 0
              ? `${formatNumber(Math.max(...selected.map((item) => item.mbps)), 1)} Mbps`
              : "-"
          }
          hint="Sets the minimum on its own"
        />
      </StatGrid>

      {selected.length > 0 ? (
        <DataTable
          caption="Everything you have selected."
          columns={["Stream", "Count", "Each", "Total"]}
          rows={selected.map((item) => [
            `${item.service} - ${item.quality}`,
            formatNumber(item.count, 0),
            `${formatNumber(item.mbps, 2)} Mbps`,
            `${formatNumber(item.total, 2)} Mbps`,
          ])}
        />
      ) : (
        <Note title="Nothing selected">
          Add a stream above to see what the household needs.
        </Note>
      )}

      <Note title="Buffering is not always a bandwidth problem">
        Streaming services adapt: they drop resolution rather than stop, so a
        picture that softens during a busy evening is a capacity signal. If the
        total above sits close to your plan, the fix is either more bandwidth or
        fewer simultaneous 4K streams.
      </Note>
    </div>
  );
}
