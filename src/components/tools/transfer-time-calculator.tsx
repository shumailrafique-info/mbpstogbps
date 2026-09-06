"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatBytes,
  formatDuration,
  formatNumber,
  parseInput,
} from "@/lib/converters/format";
import {
  EFFICIENCIES,
  efficiency,
  FILE_PRESETS,
  SPEED_TIERS,
} from "@/lib/converters/presets";
import {
  convert,
  RATE_UNITS,
  SIZE_UNITS,
  toBits,
  unit,
} from "@/lib/converters/units";
import { FieldLabel, NumberInput, Segmented, UnitSelect } from "./controls";
import { DataTable, Note, Readout, Stat, StatGrid, ToolPanel } from "./readout";

type Mode = "download" | "upload";

type TransferTimeCalculatorProps = {
  mode: Mode;
  defaultSizeValue?: number;
  defaultSizeUnit?: string;
  defaultSpeedValue?: number;
  defaultSpeedUnit?: string;
};

const GROUP_ORDER = ["Media", "Games", "Work", "Backups"] as const;

const COPY: Record<Mode, { verb: string; speedLabel: string; note: string }> = {
  download: {
    verb: "Download",
    speedLabel: "Download speed",
    note: "Download speed is the figure providers advertise, so this is usually the number on your bill.",
  },
  upload: {
    verb: "Upload",
    speedLabel: "Upload speed",
    note: "Upload is the slower direction on most cable and DSL plans - often a tenth of the download figure - so check the exact number rather than assuming it matches.",
  },
};

/**
 * Size plus rate gives time. Shared by the download and upload pages, which
 * differ only in wording and starting speed.
 */
export function TransferTimeCalculator({
  mode,
  defaultSizeValue = 25,
  defaultSizeUnit = "gb",
  defaultSpeedValue = mode === "upload" ? 20 : 100,
  defaultSpeedUnit = "mbps",
}: TransferTimeCalculatorProps) {
  const [sizeRaw, setSizeRaw] = useState(String(defaultSizeValue));
  const [sizeUnit, setSizeUnit] = useState(defaultSizeUnit);
  const [speedRaw, setSpeedRaw] = useState(String(defaultSpeedValue));
  const [speedUnit, setSpeedUnit] = useState(defaultSpeedUnit);
  const [efficiencyId, setEfficiencyId] = useState("typical");
  const [presetId, setPresetId] = useState("");

  const copy = COPY[mode];
  const overhead = efficiency(efficiencyId);

  const sizeUnitInfo = unit(sizeUnit);
  const speedUnitInfo = unit(speedUnit);

  const size = parseInput(sizeRaw) ?? 0;
  const speed = parseInput(speedRaw) ?? 0;

  const totalBits = toBits(size, sizeUnit);
  const advertisedBps = toBits(speed, speedUnit);
  const effectiveBps = advertisedBps * overhead.factor;

  const seconds = effectiveBps > 0 ? totalBits / effectiveBps : 0;
  const idealSeconds = advertisedBps > 0 ? totalBits / advertisedBps : 0;

  const applyPreset = (id: string) => {
    const preset = FILE_PRESETS.find((item) => item.id === id);
    if (!preset) return;

    setPresetId(id);
    // Presets are quoted in bytes, so they are shown in the unit that keeps the
    // number readable rather than always in gigabytes.
    const unitId =
      preset.bytes >= 1e12 ? "tb" : preset.bytes >= 1e9 ? "gb" : "mb";
    const divisor = unitId === "tb" ? 1e12 : unitId === "gb" ? 1e9 : 1e6;

    setSizeUnit(unitId);
    setSizeRaw(String(Number((preset.bytes / divisor).toFixed(2))));
  };

  const tierRows = SPEED_TIERS.map((tier) => {
    const tierBps = tier.mbps * 1e6 * overhead.factor;

    return [
      tier.label,
      `${formatNumber(tier.mbps)} Mbps`,
      formatDuration(tierBps > 0 ? totalBits / tierBps : 0),
    ];
  });

  const fileRows = FILE_PRESETS.filter((preset) =>
    [
      "song",
      "photo",
      "app",
      "episode",
      "movie-hd",
      "movie-4k",
      "aaa-game",
      "laptop-backup",
    ].includes(preset.id),
  ).map((preset) => [
    preset.label,
    `${formatNumber(preset.bytes / 1e9, 2)} GB`,
    formatDuration(effectiveBps > 0 ? (preset.bytes * 8) / effectiveBps : 0),
  ]);

  return (
    <div className="space-y-4">
      <ToolPanel>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="grid gap-2 sm:grid-cols-[1fr_9rem]">
              <NumberInput
                label="File size"
                value={sizeRaw}
                onChange={(raw) => {
                  setSizeRaw(raw);
                  setPresetId("");
                }}
                placeholder="0"
              />
              <UnitSelect
                label="Unit"
                value={sizeUnit}
                onChange={setSizeUnit}
                units={SIZE_UNITS}
              />
            </div>

            <div className="mt-3">
              <FieldLabel>Or pick something typical</FieldLabel>
              <Select
                value={presetId}
                onValueChange={(next) => applyPreset(next as string)}
              >
                <SelectTrigger className="h-10 w-full" aria-label="File preset">
                  <SelectValue placeholder="Choose a file type">
                    {(selected: string) =>
                      FILE_PRESETS.find((preset) => preset.id === selected)
                        ?.label ?? "Choose a file type"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {GROUP_ORDER.map((group) => (
                    <SelectGroup key={group}>
                      <SelectLabel>{group}</SelectLabel>
                      {FILE_PRESETS.filter(
                        (preset) => preset.group === group,
                      ).map((preset) => (
                        <SelectItem key={preset.id} value={preset.id}>
                          {preset.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="grid gap-2 sm:grid-cols-[1fr_9rem]">
              <NumberInput
                label={copy.speedLabel}
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

            <div className="mt-3">
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
        </div>
      </ToolPanel>

      <Readout
        label={`${copy.verb} time`}
        value={formatDuration(seconds)}
        copyValue={formatDuration(seconds)}
        caption={
          <span className="font-mono">
            {formatNumber(size)} {sizeUnitInfo.label} at{" "}
            {formatNumber(convert(effectiveBps, "bps", "mbps"), 2)} Mbps
            effective
          </span>
        }
      />

      <StatGrid>
        <Stat
          label="Effective speed"
          value={`${formatNumber(convert(effectiveBps, "bps", "mbyteps"), 2)} MB/s`}
          hint={`${Math.round(overhead.factor * 100)}% of advertised`}
        />
        <Stat
          label="At full speed"
          value={formatDuration(idealSeconds)}
          hint="No overhead at all"
        />
        <Stat
          label="Total data"
          value={formatBytes(totalBits, 2)}
          hint={`${formatNumber(convert(totalBits, "bit", "mb"), 0)} MB`}
        />
        <Stat
          label="Moved per minute"
          value={formatBytes(effectiveBps * 60, 2)}
          hint="At the effective speed"
        />
      </StatGrid>

      <DataTable
        caption={`The same ${formatNumber(size)} ${sizeUnitInfo.label} transfer on other connections.`}
        columns={["Connection", "Speed", `${copy.verb} time`]}
        rows={tierRows}
      />

      <DataTable
        caption={`What else your ${formatNumber(speed)} ${speedUnitInfo.label} line manages.`}
        columns={["File", "Size", "Time"]}
        rows={fileRows}
      />

      <Note title="Why the estimate moves">{copy.note}</Note>
    </div>
  );
}
