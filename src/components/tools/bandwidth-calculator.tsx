"use client";

import { useState } from "react";
import { formatNumber, parseInput } from "@/lib/converters/format";
import { SPEED_TIERS } from "@/lib/converters/presets";
import { convert } from "@/lib/converters/units";
import { FieldLabel, NumberInput, Segmented } from "./controls";
import { DataTable, Note, Readout, Stat, StatGrid, ToolPanel } from "./readout";

type ProfileId = "light" | "moderate" | "heavy";

const PROFILES: Record<
  ProfileId,
  { label: string; down: number; up: number; blurb: string }
> = {
  light: {
    label: "Light",
    down: 10,
    up: 2,
    blurb: "Browsing, email, music and the occasional HD stream.",
  },
  moderate: {
    label: "Moderate",
    down: 25,
    up: 5,
    blurb: "HD streaming, video calls, cloud file sync and social apps.",
  },
  heavy: {
    label: "Heavy",
    down: 50,
    up: 12,
    blurb: "4K streaming, large downloads, gaming and constant uploads.",
  },
};

const CONCURRENCY = [
  { value: "0.4", label: "40% at once" },
  { value: "0.6", label: "60% at once" },
  { value: "1", label: "Everyone at once" },
] as const;

const HEADROOM = [
  { value: "0.2", label: "+20% headroom" },
  { value: "0.4", label: "+40% headroom" },
  { value: "0.8", label: "+80% headroom" },
] as const;

/** Rounds a requirement up to the next plan a provider actually sells. */
function recommendedPlan(mbps: number) {
  const tier = SPEED_TIERS.find((item) => item.mbps >= mbps);
  if (tier) return tier.mbps;

  // Above the published tiers, round up to the next whole gigabit.
  return Math.ceil(mbps / 1000) * 1000;
}

/**
 * Sizes a connection for a group: how many people, how hard they use it, and
 * how many of them are online at the same moment.
 */
export function BandwidthCalculator() {
  const [usersRaw, setUsersRaw] = useState("8");
  const [profileId, setProfileId] = useState<ProfileId>("moderate");
  const [concurrency, setConcurrency] = useState<string>("0.6");
  const [headroom, setHeadroom] = useState<string>("0.4");

  const profile = PROFILES[profileId];
  const users = Math.max(0, parseInput(usersRaw) ?? 0);
  const active = Math.max(1, Math.round(users * Number(concurrency)));

  const rawDown = active * profile.down;
  const rawUp = active * profile.up;
  const requiredDown = rawDown * (1 + Number(headroom));
  const requiredUp = rawUp * (1 + Number(headroom));
  const plan = recommendedPlan(requiredDown);

  const rows = [1, 5, 10, 25, 50, 100, 250].map((count) => {
    const concurrentUsers = Math.max(
      1,
      Math.round(count * Number(concurrency)),
    );
    const need = concurrentUsers * profile.down * (1 + Number(headroom));

    return [
      `${count} ${count === 1 ? "person" : "people"}`,
      `${formatNumber(need, 0)} Mbps`,
      `${formatNumber(recommendedPlan(need), 0)} Mbps`,
    ];
  });

  return (
    <div className="space-y-4">
      <ToolPanel>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <NumberInput
              label="People or devices"
              value={usersRaw}
              onChange={setUsersRaw}
              placeholder="0"
              hint="Everyone who shares the line"
            />

            <div>
              <FieldLabel>Usage per person</FieldLabel>
              <Segmented
                value={profileId}
                onChange={(next) => setProfileId(next)}
                options={(Object.keys(PROFILES) as ProfileId[]).map((id) => ({
                  value: id,
                  label: PROFILES[id].label,
                }))}
              />
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                {profile.blurb} Around {profile.down} Mbps down and {profile.up}{" "}
                Mbps up each.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Segmented
                label="Peak concurrency"
                value={concurrency}
                onChange={setConcurrency}
                options={CONCURRENCY}
              />
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                Bandwidth is shared, so what matters is how many people are
                actually pulling data at the same moment - not the headcount.
              </p>
            </div>

            <div>
              <Segmented
                label="Growth and burst headroom"
                value={headroom}
                onChange={setHeadroom}
                options={HEADROOM}
              />
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                Spare capacity for updates, backups and the days everyone is
                home. Sizing a line to exactly the average is how it ends up
                feeling slow.
              </p>
            </div>
          </div>
        </div>
      </ToolPanel>

      <div className="grid gap-3 md:grid-cols-2">
        <Readout
          label="Download you need"
          value={formatNumber(requiredDown, 0)}
          unit="Mbps"
          copyValue={`${formatNumber(requiredDown, 0)} Mbps`}
          caption={`${active} of ${formatNumber(users, 0)} online at once, ${profile.down} Mbps each, plus ${Math.round(Number(headroom) * 100)}% headroom.`}
        />
        <Readout
          label="Upload you need"
          value={formatNumber(requiredUp, 0)}
          unit="Mbps"
          tone="muted"
          copyValue={`${formatNumber(requiredUp, 0)} Mbps`}
          caption="Video calls and cloud backups run in this direction, and it is the one providers skimp on."
        />
      </div>

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
          label="Per active user"
          value={`${formatNumber(requiredDown / active, 1)} Mbps`}
          hint={`${active} concurrent`}
        />
        <Stat
          label="In megabytes"
          value={`${formatNumber(convert(requiredDown, "mbps", "mbyteps"), 1)} MB/s`}
          hint="Combined throughput"
        />
        <Stat
          label="Without headroom"
          value={`${formatNumber(rawDown, 0)} Mbps`}
          hint="The bare minimum"
        />
      </StatGrid>

      <DataTable
        caption={`Requirement by group size at ${profile.label.toLowerCase()} usage, ${Math.round(Number(concurrency) * 100)}% concurrency.`}
        columns={["Group", "Required", "Plan to buy"]}
        rows={rows}
      />

      <Note title="Bandwidth is not the whole story">
        A line can have enough bandwidth and still feel slow. Latency, Wi-Fi
        coverage, an old router and the number of devices fighting for airtime
        all matter, and none of them are fixed by buying a bigger number.
      </Note>
    </div>
  );
}
