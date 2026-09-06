/**
 * Every unit this site converts between, expressed against a single anchor.
 *
 * `bits` is the exact number of bits one of the unit represents - bits per
 * second for a rate, plain bits for a size. Converting is therefore always
 * `value * from.bits / to.bits`, with no per-pair table to keep in sync.
 *
 * Decimal (SI) and binary (IEC) units live side by side rather than behind a
 * global multiplier, because a megabit per second really is 1,000,000 bits per
 * second while a mebibyte really is 1,048,576 bytes. Hiding that behind a
 * toggle is how most converters end up quietly wrong.
 */

export type UnitKind = "rate" | "size";
export type UnitSystem = "decimal" | "binary";
export type UnitBase = "bit" | "byte";

export type Unit = {
  id: string;
  /** Short form shown in dropdowns and results, e.g. "Mbps". */
  label: string;
  /** Spelled out, used in prose and aria labels. */
  name: string;
  kind: UnitKind;
  base: UnitBase;
  system: UnitSystem;
  /** Exact size of one unit in bits (per second, for rates). */
  bits: number;
};

const KIB = 1024;
const MIB = KIB * 1024;
const GIB = MIB * 1024;
const TIB = GIB * 1024;

export const RATE_UNITS: readonly Unit[] = [
  {
    id: "bps",
    label: "bps",
    name: "Bit per second",
    kind: "rate",
    base: "bit",
    system: "decimal",
    bits: 1,
  },
  {
    id: "kbps",
    label: "Kbps",
    name: "Kilobit per second",
    kind: "rate",
    base: "bit",
    system: "decimal",
    bits: 1e3,
  },
  {
    id: "mbps",
    label: "Mbps",
    name: "Megabit per second",
    kind: "rate",
    base: "bit",
    system: "decimal",
    bits: 1e6,
  },
  {
    id: "gbps",
    label: "Gbps",
    name: "Gigabit per second",
    kind: "rate",
    base: "bit",
    system: "decimal",
    bits: 1e9,
  },
  {
    id: "tbps",
    label: "Tbps",
    name: "Terabit per second",
    kind: "rate",
    base: "bit",
    system: "decimal",
    bits: 1e12,
  },
  {
    id: "byteps",
    label: "B/s",
    name: "Byte per second",
    kind: "rate",
    base: "byte",
    system: "decimal",
    bits: 8,
  },
  {
    id: "kbyteps",
    label: "KB/s",
    name: "Kilobyte per second",
    kind: "rate",
    base: "byte",
    system: "decimal",
    bits: 8e3,
  },
  {
    id: "mbyteps",
    label: "MB/s",
    name: "Megabyte per second",
    kind: "rate",
    base: "byte",
    system: "decimal",
    bits: 8e6,
  },
  {
    id: "gbyteps",
    label: "GB/s",
    name: "Gigabyte per second",
    kind: "rate",
    base: "byte",
    system: "decimal",
    bits: 8e9,
  },
  {
    id: "tbyteps",
    label: "TB/s",
    name: "Terabyte per second",
    kind: "rate",
    base: "byte",
    system: "decimal",
    bits: 8e12,
  },
  {
    id: "kibyteps",
    label: "KiB/s",
    name: "Kibibyte per second",
    kind: "rate",
    base: "byte",
    system: "binary",
    bits: 8 * KIB,
  },
  {
    id: "mibyteps",
    label: "MiB/s",
    name: "Mebibyte per second",
    kind: "rate",
    base: "byte",
    system: "binary",
    bits: 8 * MIB,
  },
  {
    id: "gibyteps",
    label: "GiB/s",
    name: "Gibibyte per second",
    kind: "rate",
    base: "byte",
    system: "binary",
    bits: 8 * GIB,
  },
] as const;

export const SIZE_UNITS: readonly Unit[] = [
  {
    id: "bit",
    label: "bit",
    name: "Bit",
    kind: "size",
    base: "bit",
    system: "decimal",
    bits: 1,
  },
  {
    id: "kbit",
    label: "Kb",
    name: "Kilobit",
    kind: "size",
    base: "bit",
    system: "decimal",
    bits: 1e3,
  },
  {
    id: "mbit",
    label: "Mb",
    name: "Megabit",
    kind: "size",
    base: "bit",
    system: "decimal",
    bits: 1e6,
  },
  {
    id: "gbit",
    label: "Gb",
    name: "Gigabit",
    kind: "size",
    base: "bit",
    system: "decimal",
    bits: 1e9,
  },
  {
    id: "byte",
    label: "B",
    name: "Byte",
    kind: "size",
    base: "byte",
    system: "decimal",
    bits: 8,
  },
  {
    id: "kb",
    label: "KB",
    name: "Kilobyte",
    kind: "size",
    base: "byte",
    system: "decimal",
    bits: 8e3,
  },
  {
    id: "mb",
    label: "MB",
    name: "Megabyte",
    kind: "size",
    base: "byte",
    system: "decimal",
    bits: 8e6,
  },
  {
    id: "gb",
    label: "GB",
    name: "Gigabyte",
    kind: "size",
    base: "byte",
    system: "decimal",
    bits: 8e9,
  },
  {
    id: "tb",
    label: "TB",
    name: "Terabyte",
    kind: "size",
    base: "byte",
    system: "decimal",
    bits: 8e12,
  },
  {
    id: "pb",
    label: "PB",
    name: "Petabyte",
    kind: "size",
    base: "byte",
    system: "decimal",
    bits: 8e15,
  },
  {
    id: "kib",
    label: "KiB",
    name: "Kibibyte",
    kind: "size",
    base: "byte",
    system: "binary",
    bits: 8 * KIB,
  },
  {
    id: "mib",
    label: "MiB",
    name: "Mebibyte",
    kind: "size",
    base: "byte",
    system: "binary",
    bits: 8 * MIB,
  },
  {
    id: "gib",
    label: "GiB",
    name: "Gibibyte",
    kind: "size",
    base: "byte",
    system: "binary",
    bits: 8 * GIB,
  },
  {
    id: "tib",
    label: "TiB",
    name: "Tebibyte",
    kind: "size",
    base: "byte",
    system: "binary",
    bits: 8 * TIB,
  },
] as const;

export const ALL_UNITS: readonly Unit[] = [...RATE_UNITS, ...SIZE_UNITS];

const BY_ID = new Map(ALL_UNITS.map((unit) => [unit.id, unit]));

export function unit(id: string): Unit {
  const found = BY_ID.get(id);
  if (!found) throw new Error(`Unknown unit: ${id}`);
  return found;
}

/** Units of the same kind, so a rate select never offers a size. */
export function unitsOfKind(kind: UnitKind): readonly Unit[] {
  return kind === "rate" ? RATE_UNITS : SIZE_UNITS;
}

/**
 * Converts between any two units of the same kind.
 *
 * Mixing a rate and a size is a programming error rather than a user one - the
 * selects are always built from `unitsOfKind` - so it throws rather than
 * silently returning a number that means nothing.
 */
export function convert(value: number, from: Unit | string, to: Unit | string) {
  const source = typeof from === "string" ? unit(from) : from;
  const target = typeof to === "string" ? unit(to) : to;

  if (source.kind !== target.kind) {
    throw new Error(`Cannot convert ${source.kind} to ${target.kind}`);
  }

  return (value * source.bits) / target.bits;
}

/** Bits (or bits per second) held by `value` of `from`. */
export function toBits(value: number, from: Unit | string) {
  const source = typeof from === "string" ? unit(from) : from;
  return value * source.bits;
}

export function fromBits(bits: number, to: Unit | string) {
  const target = typeof to === "string" ? unit(to) : to;
  return bits / target.bits;
}

/**
 * The factor between two units, which is what a page's explanation needs -
 * "1 Gbps = 1000 Mbps" rather than a converted value.
 */
export function factor(from: Unit | string, to: Unit | string) {
  return convert(1, from, to);
}
