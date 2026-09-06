"use client";

import { GripVerticalIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { type Control, Controller, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MAX_FAQS,
  type PageContentSchemaValues,
} from "@/lib/validation/zod/page-content.schema";

/**
 * Repeater for the page's FAQ entries.
 *
 * Questions and answers are plain text - they are rendered with React's normal
 * escaping on the public page, not as HTML.
 */
const FaqFields = ({
  control,
}: {
  control: Control<PageContentSchemaValues>;
}) => {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "faqs",
  });

  return (
    <div className="rounded-lg border border-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-slate-900">FAQs</p>
          <p className="text-xs text-slate-500">
            {fields.length} of {MAX_FAQS} — shown in this order on the page
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={fields.length >= MAX_FAQS}
          onClick={() => append({ question: "", answer: "" })}
        >
          <PlusIcon />
          Add question
        </Button>
      </div>

      {fields.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-slate-500">
          No FAQs yet. The section will not appear on the page.
        </p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {fields.map((field, index) => (
            <li key={field.id} className="space-y-3 px-4 py-4">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <GripVerticalIcon className="size-3.5 text-slate-400" />
                  Question {index + 1}
                </span>

                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    disabled={index === 0}
                    onClick={() => move(index, index - 1)}
                  >
                    Up
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    disabled={index === fields.length - 1}
                    onClick={() => move(index, index + 1)}
                  >
                    Down
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-label={`Remove question ${index + 1}`}
                    className="text-slate-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => remove(index)}
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              </div>

              <Controller
                name={`faqs.${index}.question`}
                control={control}
                render={({ field: questionField, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel className="sr-only">
                      Question {index + 1}
                    </FieldLabel>
                    <Input
                      {...questionField}
                      placeholder="Does bold text work on Instagram?"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="mt-1 text-[11px] text-red-500"
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name={`faqs.${index}.answer`}
                control={control}
                render={({ field: answerField, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel className="sr-only">
                      Answer {index + 1}
                    </FieldLabel>
                    <Textarea
                      {...answerField}
                      rows={3}
                      placeholder="Plain text answer"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="mt-1 text-[11px] text-red-500"
                      />
                    )}
                  </Field>
                )}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FaqFields;
