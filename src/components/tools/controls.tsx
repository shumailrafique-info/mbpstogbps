"use client";

import type { ReactNode } from "react";
import { useId } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Unit } from "@/lib/converters/units";
import { cn } from "@/lib/utils";

export function FieldLabel({
  htmlFor,
  children,
  hint,
}: {
  htmlFor?: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-2">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase"
      >
        {children}
      </label>
      {hint ? (
        <span className="text-[11px] text-muted-foreground">{hint}</span>
      ) : null}
    </div>
  );
}

/**
 * A numeric field that keeps the raw string.
 *
 * Storing the text rather than a number is what lets someone type "1.", clear
 * the box, or paste "1,500" without the field fighting them.
 */
export function NumberInput({
  id,
  value,
  onChange,
  label,
  hint,
  placeholder,
  min = 0,
  className,
  inputClassName,
}: {
  id?: string;
  value: string;
  onChange: (next: string) => void;
  label?: string;
  hint?: string;
  placeholder?: string;
  min?: number;
  className?: string;
  inputClassName?: string;
}) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div className={className}>
      {label ? (
        <FieldLabel htmlFor={fieldId} hint={hint}>
          {label}
        </FieldLabel>
      ) : null}
      <Input
        id={fieldId}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        min={min}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-10 sm:h-12 font-mono sm:text-lg tabular md:text-xl",
          inputClassName,
        )}
      />
    </div>
  );
}

/** Unit picker, grouped so decimal and binary units never blur together. */
export function UnitSelect({
  value,
  onChange,
  units,
  label,
  className,
  triggerClassName,
}: {
  value: string;
  onChange: (next: string) => void;
  units: readonly Unit[];
  label?: string;
  className?: string;
  triggerClassName?: string;
}) {
  const decimal = units.filter((item) => item.system === "decimal");
  const binary = units.filter((item) => item.system === "binary");

  return (
    <div className={className}>
      {label ? <FieldLabel>{label}</FieldLabel> : null}
      <Select value={value} onValueChange={(next) => onChange(next as string)}>
        <SelectTrigger
          aria-label={label ?? "Unit"}
          className={cn(
            "h-10! sm:h-12! w-full font-mono text-sm",
            triggerClassName,
          )}
        >
          {/* The stored value is a unit id, so the trigger shows its label. */}
          <SelectValue>
            {(selected: string) =>
              units.find((item) => item.id === selected)?.label ?? selected
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-80 w-fit">
          <SelectGroup>
            <SelectLabel>Decimal (SI)</SelectLabel>
            {decimal.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                <span className="font-mono">{item.label}</span>
                <span className="text-muted-foreground">{item.name}</span>
              </SelectItem>
            ))}
          </SelectGroup>
          {binary.length > 0 ? (
            <SelectGroup>
              <SelectLabel>Binary (IEC)</SelectLabel>
              {binary.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  <span className="font-mono">{item.label}</span>
                  <span className="text-muted-foreground">{item.name}</span>
                </SelectItem>
              ))}
            </SelectGroup>
          ) : null}
        </SelectContent>
      </Select>
    </div>
  );
}

/** Small inline switch used for assumptions, e.g. the overhead model. */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
  className,
}: {
  value: T;
  onChange: (next: T) => void;
  options: readonly { value: T; label: string }[];
  label?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {label ? <FieldLabel>{label}</FieldLabel> : null}
      <fieldset className="inline-flex w-full rounded-lg border border-border bg-muted/60 p-0.5">
        {label ? <legend className="sr-only">{label}</legend> : null}
        {options.map((option) => {
          const active = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "flex-1 rounded-[calc(var(--radius)-2px)] px-3 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </fieldset>
    </div>
  );
}

/** Row of one-tap starting points, e.g. common plan speeds. */
export function PresetChips({
  options,
  onSelect,
  label,
  activeValue,
}: {
  options: readonly { label: string; value: string }[];
  onSelect: (value: string) => void;
  label?: string;
  activeValue?: string;
}) {
  return (
    <div>
      {label ? <FieldLabel>{label}</FieldLabel> : null}
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => onSelect(option.value)}
            className={cn(
              "rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium transition-colors",
              option.value === activeValue
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Stepper for whole-number counts (devices, streams, people). */
export function Counter({
  value,
  onChange,
  label,
  min = 0,
  max = 99,
}: {
  value: number;
  onChange: (next: number) => void;
  label: string;
  min?: number;
  max?: number;
}) {
  const clamp = (next: number) => Math.min(max, Math.max(min, next));

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
        className="grid size-7 place-items-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
      >
        -
      </button>
      {/* An output element carries the live region without a redundant role. */}
      <output
        aria-live="polite"
        aria-label={`${label}: ${value}`}
        className="w-7 text-center font-mono text-sm font-semibold text-foreground tabular"
      >
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
        className="grid size-7 place-items-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
