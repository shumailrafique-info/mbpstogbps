"use client";

import { CheckCircle2Icon, TriangleAlertIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { formatNumber, parseInput } from "@/lib/converters/format";
import { ACTIVITIES, SPEED_TIERS } from "@/lib/converters/presets";
import { convert } from "@/lib/converters/units";
import { cn } from "@/lib/utils";
import { Counter, NumberInput, Segmented } from "./controls";
import { DataTable, Note, Readout, Stat, StatGrid, ToolPanel } from "./readout";

const HEADROOM = [
  { value: "0.2", label: "+20%" },
  { value: "0.4", label: "+40%" },
  { value: "0.7", label: "+70%" },
] as const;

const DEFAULT_COUNTS: Record<string, number> = {
  browsing: 2,
  hd: 1,
  uhd: 1,
  "video-call": 1,
  gaming: 1,
  "smart-home": 3,
};

const GROUPS = ["Everyday", "Streaming", "Work", "Play", "Home"] as const;

function recommendedPlan(mbps: number) {
  const tier = SPEED_TIERS.find((item) => item.mbps >= mbps);
  return tier ? tier.mbps : Math.ceil(mbps / 1000) * 1000;
}

/**
 * Builds a plan recommendation from what a household actually does at once,
 * then checks it against the connection they already pay for.
 */
export function InternetSpeedCalculator() {
  const [counts, setCounts] = useState<Record<string, number>>(DEFAULT_COUNTS);
  const [headroom, setHeadroom] = useState<string>("0.4");
  const [currentRaw, setCurrentRaw] = useState("100");

  const setCount = (id: string, next: number) =>
    setCounts((current) => ({ ...current, [id]: next }));

  const selected = useMemo(
    () =>
      ACTIVITIES.filter((activity) => (counts[activity.id] ?? 0) > 0).map(
        (activity) => ({
          ...activity,
          count: counts[activity.id] ?? 0,
          down: (counts[activity.id] ?? 0) * activity.mbps,
          up: (counts[activity.id] ?? 0) * activity.uploadMbps,
        }),
      ),
    [counts],
  );

  const rawDown = selected.reduce((sum, item) => sum + item.down, 0);
  const rawUp = selected.reduce((sum, item) => sum + item.up, 0);
  const neededDown = rawDown * (1 + Number(headroom));
  const neededUp = rawUp * (1 + Number(headroom));
  const plan = recommendedPlan(neededDown);

  const current = Math.max(0, parseInput(currentRaw) ?? 0);
  const enough = current >= neededDown;
  const latencyCount = selected.filter((item) => item.latencySensitive).length;

  return (
    <div className="space-y-4">
      <ToolPanel>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
              A busy evening in your home
            </p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Count what runs at the same time on your worst-case night, not on
              an average one.
            </p>
          </div>
          <Segmented
            label="Headroom"
            value={headroom}
            onChange={setHeadroom}
            options={HEADROOM}
            className="w-48"
          />
        </div>

        <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {GROUPS.map((group) => (
            <div key={group}>
              <h3 className="mb-2 border-b border-border pb-1.5 text-sm font-semibold text-foreground">
                {group}
              </h3>
              <ul className="grid gap-1.5">
                {ACTIVITIES.filter((activity) => activity.group === group).map(
                  (activity) => (
                    <li
                      key={activity.id}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="min-w-0 text-[13px]">
                        <span className="text-foreground">
                          {activity.label}
                        </span>
                        <span className="ml-1.5 font-mono text-[11px] text-muted-foreground">
                          {activity.mbps} / {activity.uploadMbps} Mbps
                        </span>
                      </span>
                      <Counter
                        label={activity.label}
                        value={counts[activity.id] ?? 0}
                        onChange={(next) => setCount(activity.id, next)}
                        max={20}
                      />
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </ToolPanel>

      <div className="grid gap-3 md:grid-cols-2">
        <Readout
          label="Download you need"
          value={formatNumber(neededDown, 0)}
          unit="Mbps"
          copyValue={`${formatNumber(neededDown, 0)} Mbps`}
          caption={`${formatNumber(rawDown, 0)} Mbps of activity plus ${Math.round(Number(headroom) * 100)}% headroom.`}
        />
        <Readout
          label="Upload you need"
          value={formatNumber(neededUp, 0)}
          unit="Mbps"
          tone="muted"
          copyValue={`${formatNumber(neededUp, 0)} Mbps`}
          caption="Calls, backups and game streaming all live here."
        />
      </div>

      <ToolPanel className="p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-[minmax(0,16rem)_1fr] sm:items-end">
          <NumberInput
            label="Your current plan"
            value={currentRaw}
            onChange={setCurrentRaw}
            placeholder="0"
            hint="Download, in Mbps"
          />

          <div
            className={cn(
              "flex items-start gap-3 rounded-lg border p-3.5",
              enough
                ? "border-primary/40 bg-accent/40"
                : "border-destructive/40 bg-destructive/5",
            )}
          >
            {enough ? (
              <CheckCircle2Icon
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-primary"
              />
            ) : (
              <TriangleAlertIcon
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-destructive"
              />
            )}
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {enough ? (
                <>
                  <span className="font-semibold text-foreground">
                    You have enough.
                  </span>{" "}
                  {formatNumber(current, 0)} Mbps covers the{" "}
                  {formatNumber(neededDown, 0)} Mbps above with{" "}
                  {formatNumber(current - neededDown, 0)} Mbps to spare.
                  Spending more would not make this evening any smoother.
                </>
              ) : (
                <>
                  <span className="font-semibold text-foreground">
                    You are short by {formatNumber(neededDown - current, 0)}{" "}
                    Mbps.
                  </span>{" "}
                  A {formatNumber(plan, 0)} Mbps plan would cover it. Before you
                  upgrade, check that your router and Wi-Fi can carry the speed
                  you already pay for.
                </>
              )}
            </p>
          </div>
        </div>
      </ToolPanel>

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
          value={`${formatNumber(convert(neededDown, "mbps", "mbyteps"), 1)} MB/s`}
          hint="Combined throughput"
        />
        <Stat
          label="Activities counted"
          value={formatNumber(
            selected.reduce((sum, item) => sum + item.count, 0),
            0,
          )}
          hint="Running at once"
        />
        <Stat
          label="Latency sensitive"
          value={formatNumber(latencyCount, 0)}
          hint="Ping matters more than speed"
        />
      </StatGrid>

      {selected.length > 0 ? (
        <DataTable
          caption="Where the requirement comes from."
          columns={["Activity", "Count", "Download", "Upload"]}
          rows={selected.map((item) => [
            item.label,
            formatNumber(item.count, 0),
            `${formatNumber(item.down, 1)} Mbps`,
            `${formatNumber(item.up, 1)} Mbps`,
          ])}
        />
      ) : null}

      <Note title="Past a point, more speed changes nothing">
        Once a connection comfortably covers everything running at once, extra
        megabits sit unused. What you feel after that is latency, Wi-Fi coverage
        and the router - which is why a 1 Gbps plan can still feel worse than a
        well-set-up 200 Mbps one.
      </Note>
    </div>
  );
}
