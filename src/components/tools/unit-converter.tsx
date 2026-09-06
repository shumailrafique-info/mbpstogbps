"use client";

import { ArrowRightLeftIcon, RotateCcwIcon } from "lucide-react";
import { useMemo, useState } from "react";
import {
  formatDuration,
  formatNumber,
  type Precision,
  parseInput,
} from "@/lib/converters/format";
import {
  convert,
  factor,
  toBits,
  type UnitKind,
  unit,
  unitsOfKind,
} from "@/lib/converters/units";
import { NumberInput, PresetChips, Segmented, UnitSelect } from "./controls";
import { CopyButton } from "./copy-button";
import { DataTable, Note, Readout, Stat, StatGrid, ToolPanel } from "./readout";

type Side = "from" | "to";

type UnitConverterProps = {
  kind: UnitKind;
  /** Unit ids the two selects start on. */
  defaultFrom: string;
  defaultTo: string;
  defaultValue: number;
  /** One-tap starting points, in the "from" unit. */
  presets?: readonly number[];
  classNames?: readonly string[];
  /** Rows for the reference table, in the "from" unit. */
  tableValues?: readonly number[];
  /**
   * Shows what a rate of this size actually supports. Only meaningful for
   * rates, so size converters leave it off.
   */
  insights?: boolean;
};

const PRECISION_OPTIONS = [
  { value: "auto", label: "Auto" },
  { value: "2", label: "2 dp" },
  { value: "6", label: "6 dp" },
] as const;

const HD_STREAM_MBPS = 5;
const UHD_STREAM_MBPS = 25;
const GAME_BYTES = 50e9;

/**
 * The converter behind every "x to y" page.
 *
 * Both boxes are live: whichever one was typed in last is the source and the
 * other is derived. That keeps one value in state rather than trying to hold
 * two inputs in step with each other.
 */
export function UnitConverter({
  kind,
  defaultFrom,
  defaultTo,
  defaultValue,
  presets,
  tableValues,
  insights = false,
}: UnitConverterProps) {
  const [fromUnit, setFromUnit] = useState(defaultFrom);
  const [toUnit, setToUnit] = useState(defaultTo);
  const [source, setSource] = useState<{ side: Side; raw: string }>({
    side: "from",
    raw: String(defaultValue),
  });
  const [precisionKey, setPrecisionKey] = useState<"auto" | "2" | "6">("auto");
  const [showBinary, setShowBinary] = useState(false);

  const precision: Precision =
    precisionKey === "auto" ? "auto" : Number(precisionKey);

  const from = unit(fromUnit);
  const to = unit(toUnit);
  const typed = parseInput(source.raw);

  // The value in the "from" unit, whichever box it was typed into.
  const baseValue =
    typed === null
      ? null
      : source.side === "from"
        ? typed
        : convert(typed, to, from);

  const converted = baseValue === null ? null : convert(baseValue, from, to);

  const fromDisplay =
    source.side === "from"
      ? source.raw
      : baseValue === null
        ? ""
        : formatNumber(baseValue, precision);

  const toDisplay =
    source.side === "to"
      ? source.raw
      : converted === null
        ? ""
        : formatNumber(converted, precision);

  // Binary units stay hidden until asked for, but a unit already in play is
  // never removed from under the reader.
  const options = useMemo(() => {
    const all = unitsOfKind(kind);
    if (showBinary) return all;

    return all.filter(
      (item) =>
        item.system === "decimal" || item.id === fromUnit || item.id === toUnit,
    );
  }, [kind, showBinary, fromUnit, toUnit]);

  const perUnit = factor(from, to);

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setSource({ side: "from", raw: toDisplay.replace(/,/g, "") });
  };

  const reset = () => {
    setFromUnit(defaultFrom);
    setToUnit(defaultTo);
    setSource({ side: "from", raw: String(defaultValue) });
    setPrecisionKey("auto");
  };

  const rows = (tableValues ?? []).map((value) => [
    `${formatNumber(value)} ${from.label}`,
    `${formatNumber(convert(value, from, to), precision)} ${to.label}`,
  ]);

  const matchedRow = (tableValues ?? []).findIndex(
    (value) => baseValue !== null && Math.abs(value - baseValue) < 1e-9,
  );

  const bitsPerSecond = baseValue === null ? 0 : toBits(baseValue, from);

  return (
    <div className="space-y-4">
      <ToolPanel>
        <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <div className="grid gap-2 sm:grid-cols-[1fr_9.5rem]">
            <NumberInput
              label="From"
              value={fromDisplay}
              onChange={(raw) => setSource({ side: "from", raw })}
              placeholder="0"
            />
            <UnitSelect
              label="Unit"
              value={fromUnit}
              onChange={setFromUnit}
              units={options}
            />
          </div>

          <button
            type="button"
            onClick={swap}
            aria-label="Swap the two units"
            className="grid size-12 shrink-0 place-items-center self-end rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary max-sm:mx-auto max-sm:rotate-90"
          >
            <ArrowRightLeftIcon aria-hidden className="size-4" />
          </button>

          <div className="grid gap-2 sm:grid-cols-[1fr_9.5rem]">
            <NumberInput
              label="To"
              value={toDisplay}
              onChange={(raw) => setSource({ side: "to", raw })}
              placeholder="0"
              inputClassName="border-primary/40 bg-accent/30"
            />
            <UnitSelect
              label="Unit"
              value={toUnit}
              onChange={setToUnit}
              units={options}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-border pt-4">
          {presets && presets.length > 0 ? (
            <PresetChips
              label={`Common ${from.label} values`}
              options={presets.map((value) => ({
                label: formatNumber(value),
                value: String(value),
              }))}
              activeValue={
                source.side === "from" ? source.raw.trim() : undefined
              }
              onSelect={(value) => setSource({ side: "from", raw: value })}
            />
          ) : (
            <span />
          )}

          <div className="flex items-end gap-2">
            <Segmented
              label="Decimals"
              value={precisionKey}
              onChange={setPrecisionKey}
              options={PRECISION_OPTIONS}
              className="w-44"
            />
            <button
              type="button"
              onClick={reset}
              aria-label="Reset the converter"
              className="grid size-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <RotateCcwIcon aria-hidden className="size-3.5" />
            </button>
          </div>
        </div>

        <label className="mt-3 flex w-fit cursor-pointer items-center gap-2 text-[13px] text-muted-foreground">
          <input
            type="checkbox"
            checked={showBinary}
            onChange={(event) => setShowBinary(event.target.checked)}
            className="size-3.5 accent-primary"
          />
          Show binary units (KiB, MiB, GiB - powers of 1,024)
        </label>
      </ToolPanel>

      <Readout
        label={`${from.label} to ${to.label}`}
        value={converted === null ? "-" : formatNumber(converted, precision)}
        unit={to.label}
        copyValue={
          converted === null ? undefined : formatNumber(converted, precision)
        }
        caption={
          <>
            <span className="font-mono">
              1 {from.label} = {formatNumber(perUnit)} {to.label}
            </span>
            {baseValue === null ? null : (
              <>
                {" - "}
                <span className="font-mono">
                  {formatNumber(baseValue)} x {formatNumber(perUnit)} ={" "}
                  {formatNumber(converted ?? 0, precision)}
                </span>
              </>
            )}
          </>
        }
      />

      {insights && bitsPerSecond > 0 ? (
        <StatGrid>
          <Stat
            label="Megabytes per second"
            value={`${formatNumber(convert(baseValue ?? 0, from, "mbyteps"), 2)} MB/s`}
            hint="What a download manager shows"
          />
          <Stat
            label="4K streams at once"
            value={formatNumber(
              Math.floor(bitsPerSecond / (UHD_STREAM_MBPS * 1e6)),
              0,
            )}
            hint={`${UHD_STREAM_MBPS} Mbps each`}
          />
          <Stat
            label="HD streams at once"
            value={formatNumber(
              Math.floor(bitsPerSecond / (HD_STREAM_MBPS * 1e6)),
              0,
            )}
            hint={`${HD_STREAM_MBPS} Mbps each`}
          />
          <Stat
            label="50 GB game download"
            value={formatDuration((GAME_BYTES * 8) / bitsPerSecond)}
            hint="At the full advertised rate"
          />
        </StatGrid>
      ) : null}

      {rows.length > 0 ? (
        <DataTable
          caption={`${from.name} to ${to.name} at a glance.`}
          columns={[from.label, to.label]}
          rows={rows}
          highlightIndex={matchedRow >= 0 ? matchedRow : undefined}
        />
      ) : null}

      <Note title="Bits, bytes and why the two differ">
        A lowercase b is a bit and an uppercase B is a byte, and there are eight
        bits in a byte. Internet plans are sold in bits per second while files
        and download managers are measured in bytes, which is why a 1,000 Mbps
        line tops out at around 125 MB/s rather than 1,000.
      </Note>

      <div className="flex justify-end">
        <CopyButton
          withLabel
          label="the full conversion"
          value={
            baseValue === null || converted === null
              ? ""
              : `${formatNumber(baseValue)} ${from.label} = ${formatNumber(converted, precision)} ${to.label}`
          }
        />
      </div>
    </div>
  );
}
