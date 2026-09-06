"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { type Control, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TOOLS } from "@/lib/navigation";
import {
  MAX_RELATED,
  type PageContentSchemaValues,
} from "@/lib/validation/zod/page-content.schema";

/**
 * Picker for the Related Tools section.
 *
 * The options come from the navigation registry, so only tools that actually
 * exist can be selected - the action rejects anything else anyway.
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
  const options = TOOLS.filter((tool) => tool.slug !== currentSlug);

  const query = term.trim().toLowerCase();
  const visible = query
    ? options.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.slug.toLowerCase().includes(query),
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
          <div className="rounded-lg border border-border">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Related tools
                </p>
                <p className="text-xs text-muted-foreground">
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
              <ul className="flex flex-wrap gap-2 border-b border-border px-4 py-3">
                {selected.map((slug, index) => {
                  const tool = options.find((option) => option.slug === slug);
                  return (
                    <li key={slug}>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent py-1 pr-1 pl-2.5 text-xs font-medium text-primary">
                        <span className="text-primary/70">{index + 1}</span>
                        {tool?.name ?? slug}
                        <button
                          type="button"
                          aria-label={`Remove ${tool?.name ?? slug}`}
                          onClick={() => toggle(slug)}
                          className="rounded-full p-0.5 text-primary transition-colors hover:bg-accent hover:text-primary"
                        >
                          <XIcon className="size-3" />
                        </button>
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            <div className="border-b border-border px-4 py-3">
              <div className="relative max-w-xs">
                <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  placeholder="Search tools"
                  aria-label="Search tools"
                  className="h-9 pl-9"
                />
              </div>
            </div>

            <ul className="max-h-64 divide-y divide-border overflow-y-auto">
              {visible.map((tool) => {
                const isSelected = selected.includes(tool.slug);
                const disabled = !isSelected && atLimit;

                return (
                  <li key={tool.slug}>
                    <label
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm ${
                        disabled
                          ? "cursor-not-allowed text-muted-foreground"
                          : "cursor-pointer text-foreground hover:bg-accent/60"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        disabled={disabled}
                        onChange={() => toggle(tool.slug)}
                        className="size-4 accent-primary"
                      />
                      <span className="flex-1 truncate">{tool.name}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {tool.path}
                      </span>
                    </label>
                  </li>
                );
              })}

              {visible.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-muted-foreground">
                  No tools match that search.
                </li>
              ) : null}
            </ul>

            {fieldState.invalid ? (
              <p className="border-t border-border px-4 py-2 text-[11px] text-destructive">
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
