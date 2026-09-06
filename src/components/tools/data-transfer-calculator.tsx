"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatBytes,
  formatDuration,
  formatNumber,
  parseInput,
} from "@/lib/converters/format";
import { EFFICIENCIES, efficiency } from "@/lib/converters/presets";
import {
  convert,
  fromBits,
  RATE_UNITS,
  toBits,
  unit,
} from "@/lib/converters/units";
import { FieldLabel, NumberInput, Segmented, UnitSelect } from "./controls";
import { DataTable, Note, Readout, Stat, StatGrid, ToolPanel } from "./readout";

const PERIODS = [
  { id: "second", label: "Seconds", one: "second", seconds: 1 },
  { id: "minute", label: "Minutes", one: "minute", seconds: 60 },
  { id: "hour", label: "Hours", one: "hour", seconds: 3600 },
  { id: "day", label: "Days", one: "day", seconds: 86400 },
  { id: "week", label: "Weeks", one: "week", seconds: 604800 },
  { id: "month", label: "Months (30 days)", one: "month", seconds: 2592000 },
] as const;

const WINDOWS = [
  { label: "1 minute", seconds: 60 },
  { label: "1 hour", seconds: 3600 },
  { label: "8 hours", seconds: 28800 },
  { label: "1 day", seconds: 86400 },
  { label: "1 week", seconds: 604800 },
  { label: "30 days", seconds: 2592000 },
] as const;

const MOVIE_BYTES = 25e9;

/**
 * Speed multiplied by time: how much data actually crosses the line in a
 * window, which is the figure that matters against a monthly cap.
 */
export function DataTransferCalculator() {
  const [speedRaw, setSpeedRaw] = useState("100");
  const [speedUnit, setSpeedUnit] = useState("mbps");
  const [durationRaw, setDurationRaw] = useState("1");
  const [periodId, setPeriodId] = useState<string>("hour");
  const [efficiencyId, setEfficiencyId] = useState("typical");
  const [capRaw, setCapRaw] = useState("1000");

  const overhead = efficiency(efficiencyId);
  const speedUnitInfo = unit(speedUnit);

  const speed = Math.max(0, parseInput(speedRaw) ?? 0);
  const duration = Math.max(0, parseInput(durationRaw) ?? 0);
  const period = PERIODS.find((item) => item.id === periodId) ?? PERIODS[2];
  const seconds = duration * period.seconds;

  const effectiveBps = toBits(speed, speedUnit) * overhead.factor;
  const totalBits = effectiveBps * seconds;
  const totalGb = fromBits(totalBits, "gb");

  // A monthly allowance, in gigabytes, and how long it survives at this rate.
  const cap = Math.max(0, parseInput(capRaw) ?? 0);
  const capSeconds = effectiveBps > 0 ? (cap * 8e9) / effectiveBps : 0;

  const rows = WINDOWS.map((window) => [
    window.label,
    formatBytes(effectiveBps * window.seconds, 2),
    `${formatNumber(fromBits(effectiveBps * window.seconds, "gb"), 2)} GB`,
  ]);

  return (
    <div className="space-y-4">
      <ToolPanel>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div className="grid gap-2 sm:grid-cols-[1fr_9rem]">
              <NumberInput
                label="Sustained speed"
                value={speedRaw}
                onChange={setSpeedRaw}
                placeholder="0"
              />
              <UnitSelect
                label="Unit"
                value={speedUnit}
                onChange={setSpeedUnit}
                units={RATE_UNITS}
              />
            </div>

            <div>
              <Segmented
                label="Real-world overhead"
                value={efficiencyId}
                onChange={setEfficiencyId}
                options={EFFICIENCIES.map((item) => ({
                  value: item.id,
                  label: item.label,
                }))}
              />
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                {overhead.hint}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid gap-2 sm:grid-cols-[1fr_11rem]">
              <NumberInput
                label="For how long"
                value={durationRaw}
                onChange={setDurationRaw}
                placeholder="0"
              />
              <div>
                <FieldLabel>Period</FieldLabel>
                <Select
                  value={periodId}
                  onValueChange={(next) => setPeriodId(next as string)}
                >
                  <SelectTrigger
                    aria-label="Time period"
                    className="h-12 w-full font-mono text-sm"
                  >
                    <SelectValue>
                      {(selected: string) =>
                        PERIODS.find((item) => item.id === selected)?.label ??
                        selected
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {PERIODS.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <NumberInput
              label="Monthly data allowance"
              value={capRaw}
              onChange={setCapRaw}
              placeholder="0"
              hint="In GB - leave at 1000 for a 1 TB cap"
            />
          </div>
        </div>
      </ToolPanel>

      <Readout
        label="Data transferred"
        value={formatBytes(totalBits, 2).split(" ")[0]}
        unit={formatBytes(totalBits, 2).split(" ")[1]}
        copyValue={formatBytes(totalBits, 2)}
        caption={
          <span className="font-mono">
            {formatNumber(speed)} {speedUnitInfo.label} x{" "}
            {formatNumber(duration)} {period.one}
            {duration === 1 ? "" : "s"} at {Math.round(overhead.factor * 100)}%
            efficiency
          </span>
        }
      />

      <StatGrid>
        <Stat
          label="In gigabytes"
          value={`${formatNumber(totalGb, 2)} GB`}
          hint="Decimal GB, as ISPs count it"
        />
        <Stat
          label="In gigabits"
          value={`${formatNumber(fromBits(totalBits, "gbit"), 2)} Gb`}
          hint="The same data in bits"
        />
        <Stat
          label="4K movies"
          value={formatNumber(totalBits / 8 / MOVIE_BYTES, 1)}
          hint="At 25 GB each"
        />
        <Stat
          label={`${formatNumber(cap, 0)} GB cap lasts`}
          value={formatDuration(capSeconds)}
          hint="At this rate, non-stop"
        />
      </StatGrid>

      <DataTable
        caption={`Data moved at ${formatNumber(speed)} ${speedUnitInfo.label} over different windows.`}
        columns={["Window", "Data", "In GB"]}
        rows={rows}
      />

      <Note title="Caps count bytes, not bits">
        A data allowance is quoted in gigabytes while your line is sold in
        megabits per second. Dividing by eight is what connects the two: a 100
        Mbps line running flat out moves about{" "}
        {formatNumber(convert(100 * 0.85, "mbps", "mbyteps"), 1)} MB every
        second, which is more than 3 TB in a month.
      </Note>
    </div>
  );
}
