"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { type Control, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GENERATORS } from "@/lib/navigation";
import {
  MAX_RELATED,
  type PageContentSchemaValues,
} from "@/lib/validation/zod/page-content.schema";

/**
 * Picker for the Related Generators section.
 *
 * The options come from the navigation registry, so only generators that
 * actually exist can be selected - the action rejects anything else anyway.
 */
const RelatedFields = ({
  control,
  currentSlug,
}: {
  control: Control<PageContentSchemaValues>;
  currentSlug: string;
}) => {
  const [term, setTerm] = useState("");

  // A page linking to itself is never useful.
  const options = GENERATORS.filter(
    (generator) => generator.slug !== currentSlug,
  );

  const query = term.trim().toLowerCase();
  const visible = query
    ? options.filter(
        (generator) =>
          generator.name.toLowerCase().includes(query) ||
          generator.slug.toLowerCase().includes(query),
      )
    : options;

  return (
    <Controller
      name="related_slugs"
      control={control}
      render={({ field, fieldState }) => {
        const selected = field.value ?? [];
        const atLimit = selected.length >= MAX_RELATED;

        function toggle(slug: string) {
          if (selected.includes(slug)) {
            field.onChange(selected.filter((s) => s !== slug));
            return;
          }
          if (atLimit) return;
          field.onChange([...selected, slug]);
        }

        return (
          <div className="rounded-lg border border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Related generators
                </p>
                <p className="text-xs text-slate-500">
                  {selected.length} of {MAX_RELATED} selected
                </p>
              </div>

              {selected.length > 0 ? (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => field.onChange([])}
                >
                  Clear all
                </Button>
              ) : null}
            </div>

            {selected.length > 0 ? (
              <ul className="flex flex-wrap gap-2 border-b border-slate-100 px-4 py-3">
                {selected.map((slug, index) => {
                  const generator = options.find((o) => o.slug === slug);
                  return (
                    <li key={slug}>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 py-1 pr-1 pl-2.5 text-xs font-medium text-blue-700">
                        <span className="text-blue-400">{index + 1}</span>
                        {generator?.name ?? slug}
                        <button
                          type="button"
                          aria-label={`Remove ${generator?.name ?? slug}`}
                          onClick={() => toggle(slug)}
                          className="rounded-full p-0.5 text-blue-500 transition-colors hover:bg-blue-100 hover:text-blue-800"
                        >
                          <XIcon className="size-3" />
                        </button>
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            <div className="border-b border-slate-100 px-4 py-3">
              <div className="relative max-w-xs">
                <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  placeholder="Search generators"
                  aria-label="Search generators"
                  className="h-9 pl-9"
                />
              </div>
            </div>

            <ul className="max-h-64 divide-y divide-slate-100 overflow-y-auto">
              {visible.map((generator) => {
                const isSelected = selected.includes(generator.slug);
                const disabled = !isSelected && atLimit;

                return (
                  <li key={generator.slug}>
                    <label
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm ${
                        disabled
                          ? "cursor-not-allowed text-slate-400"
                          : "cursor-pointer text-slate-700 hover:bg-blue-50/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        disabled={disabled}
                        onChange={() => toggle(generator.slug)}
                        className="size-4 accent-blue-600"
                      />
                      <span className="flex-1 truncate">{generator.name}</span>
                      <span className="truncate text-xs text-slate-400">
                        /{generator.slug}
                      </span>
                    </label>
                  </li>
                );
              })}

              {visible.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-slate-500">
                  No generators match that search.
                </li>
              ) : null}
            </ul>

            {fieldState.invalid ? (
              <p className="border-t border-slate-100 px-4 py-2 text-[11px] text-red-500">
                {fieldState.error?.message}
              </p>
            ) : null}
          </div>
        );
      }}
    />
  );
};

export default RelatedFields;
