/**
 * Number and duration formatting shared by every tool.
 *
 * Results are the product on this site, so they are formatted once here rather
 * than each page reaching for `toFixed` with its own idea of precision.
 */

import { fromBits, SIZE_UNITS, type Unit, unit } from "./units";

/** Number of significant digits kept when the caller asks for automatic precision. */
const AUTO_SIGNIFICANT_DIGITS = 6;

export type Precision = number | "auto";

/**
 * Formats a converted value for display.
 *
 * Automatic precision keeps six significant digits and then trims trailing
 * zeros, so 1.5 stays "1.5" while 0.000125 does not collapse to "0.00".
 */
export function formatNumber(value: number, precision: Precision = "auto") {
  if (!Number.isFinite(value)) return "-";
  if (value === 0) return "0";

  const magnitude = Math.abs(value);

  if (magnitude >= 1e15 || magnitude < 1e-6) {
    return value.toExponential(precision === "auto" ? 4 : precision);
  }

  const decimals =
    precision === "auto"
      ? Math.min(
          10,
          Math.max(
            0,
            AUTO_SIGNIFICANT_DIGITS - 1 - Math.floor(Math.log10(magnitude)),
          ),
        )
      : precision;

  const fixed = value.toFixed(decimals);
  const trimmed = precision === "auto" ? Number(fixed).toString() : fixed;

  // Group the integer part only; the fraction reads better ungrouped.
  const [whole, fraction] = trimmed.split(".");
  const grouped = Number(whole).toLocaleString("en-US");

  return fraction ? `${grouped}.${fraction}` : grouped;
}

/** `formatNumber` plus the unit label, e.g. "1.5 Gbps". */
export function formatWithUnit(
  value: number,
  target: Unit | string,
  precision: Precision = "auto",
) {
  const resolved = typeof target === "string" ? unit(target) : target;
  return `${formatNumber(value, precision)} ${resolved.label}`;
}

export type Duration = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** Total seconds, unrounded, for callers that need the raw figure. */
  total: number;
};

export function splitDuration(totalSeconds: number): Duration {
  const safe =
    Number.isFinite(totalSeconds) && totalSeconds > 0 ? totalSeconds : 0;
  const whole = Math.floor(safe);

  return {
    days: Math.floor(whole / 86400),
    hours: Math.floor((whole % 86400) / 3600),
    minutes: Math.floor((whole % 3600) / 60),
    seconds: whole % 60,
    total: safe,
  };
}

/**
 * Human duration, e.g. "1 h 12 min 5 s".
 *
 * Sub-second results keep their decimals instead of rounding to "0 s", because
 * a small file on a fast line is exactly the case people are checking.
 */
export function formatDuration(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return "0 s";
  if (totalSeconds < 1) return `${formatNumber(totalSeconds, 3)} s`;

  const { days, hours, minutes, seconds } = splitDuration(totalSeconds);
  const parts: string[] = [];

  if (days) parts.push(`${days} d`);
  if (hours) parts.push(`${hours} h`);
  if (minutes) parts.push(`${minutes} min`);
  if (seconds || parts.length === 0) parts.push(`${seconds} s`);

  // Three units is enough resolution; nobody needs seconds on a two-day copy.
  return parts.slice(0, 3).join(" ");
}

/** Clock-style duration for compact table cells, e.g. "01:12:05". */
export function formatClock(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return "00:00:00";

  const { days, hours, minutes, seconds } = splitDuration(totalSeconds);
  const pad = (n: number) => n.toString().padStart(2, "0");
  const clock = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return days ? `${days}d ${clock}` : clock;
}

const BYTE_LADDER = ["byte", "kb", "mb", "gb", "tb", "pb"] as const;

/**
 * Picks a readable byte unit for a raw bit count, e.g. 8e9 bits -> "1 GB".
 * Used wherever a size is derived rather than typed by the reader.
 */
export function formatBytes(bits: number, precision: Precision = "auto") {
  if (!Number.isFinite(bits) || bits <= 0) return "0 B";

  const ladder = BYTE_LADDER.map((id) => unit(id));
  const chosen =
    ladder.findLast((candidate) => bits >= candidate.bits) ?? ladder[0];

  return formatWithUnit(fromBits(bits, chosen), chosen, precision);
}

/** Same idea for rates, so a derived speed reads as "1.5 Gbps" not "1500 Mbps". */
export function formatRate(
  bitsPerSecond: number,
  precision: Precision = "auto",
) {
  if (!Number.isFinite(bitsPerSecond) || bitsPerSecond <= 0) return "0 Mbps";

  const ladder = ["bps", "kbps", "mbps", "gbps", "tbps"].map((id) => unit(id));
  const chosen =
    ladder.findLast((candidate) => bitsPerSecond >= candidate.bits) ??
    ladder[0];

  return formatWithUnit(fromBits(bitsPerSecond, chosen), chosen, precision);
}

/** Parses a typed value, tolerating grouping commas and a lone minus or dot. */
export function parseInput(raw: string) {
  const cleaned = raw.replace(/,/g, "").trim();
  if (cleaned === "" || cleaned === "-" || cleaned === ".") return null;

  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

export const SIZE_UNIT_IDS = SIZE_UNITS.map((size) => size.id);
