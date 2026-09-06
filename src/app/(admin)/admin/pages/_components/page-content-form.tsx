"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeftIcon,
  Loader,
  Trash2Icon,
  TriangleAlertIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TipTapEditor from "@/components/tip-tap/tip-tap-editor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import type { PageContentType } from "@/drizzle/types";
import {
  type ManagedPage,
  parseFaqs,
  parseRelatedSlugs,
} from "@/lib/page-content";
import {
  usePageContentDelete,
  usePageContentUpsert,
} from "@/lib/react-query/hooks/use-page-content";
import {
  type PageContentSchemaValues,
  pageContentSchema,
} from "@/lib/validation/zod/page-content.schema";
import FaqFields from "./faq-fields";
import RelatedFields from "./related-fields";

const PageContentForm = ({
  page,
  content,
}: {
  page: ManagedPage;
  content: PageContentType | undefined;
}) => {
  const router = useRouter();
  const { mutate: savePage, isPending: isSaving } = usePageContentUpsert();
  const { mutate: clearPage, isPending: isClearing } = usePageContentDelete();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const form = useForm<PageContentSchemaValues>({
    resolver: zodResolver(pageContentSchema),
    defaultValues: {
      slug: page.slug,
      title: content?.title ?? "",
      description: content?.description ?? "",
      meta_title: content?.meta_title ?? "",
      meta_description: content?.meta_description ?? "",
      html: content?.html ?? "",
      faqs: parseFaqs(content?.faqs),
      related_slugs: parseRelatedSlugs(content?.related_slugs),
    },
  });

  function onSubmit(data: PageContentSchemaValues) {
    savePage(data, {
      onSuccess: () => {
        toast.add({ title: `${page.name} updated` });
        router.push("/admin/pages");
      },
      onError: (err) => {
        toast.add({ title: err?.message || "Failed to save page content" });
      },
    });
  }

  function onClear() {
    clearPage(page.slug, {
      onSuccess: () => {
        toast.add({ title: `${page.name} content cleared` });
        setConfirmOpen(false);
        router.push("/admin/pages");
      },
      onError: (err) => {
        toast.add({ title: err?.message || "Failed to clear page content" });
      },
    });
  }

  return (
    <div className="p-8">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 text-muted-foreground hover:bg-accent hover:text-primary"
        nativeButton={false}
        render={<Link href="/admin/pages" />}
      >
        <ArrowLeftIcon />
        All pages
      </Button>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{page.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Anything left blank will not appear on{" "}
            <span className="font-medium text-foreground">{page.path}</span>.
          </p>
        </div>

        {content ? (
          <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <AlertDialogTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                />
              }
            >
              <Trash2Icon />
              Clear content
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive">
                  <TriangleAlertIcon />
                </AlertDialogMedia>
                <AlertDialogTitle>Clear this page's content?</AlertDialogTitle>
                <AlertDialogDescription>
                  <span className="font-medium text-foreground">
                    {page.name}
                  </span>{" "}
                  will go back to showing no title, description or content. This
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel disabled={isClearing}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onClear}
                  disabled={isClearing}
                  className="bg-destructive text-background hover:bg-destructive/90"
                >
                  {isClearing ? (
                    <>
                      <Loader className="animate-spin" />
                      Clearing
                    </>
                  ) : (
                    "Clear content"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel>Title</FieldLabel>
              <Input
                {...field}
                placeholder="Shown as the heading on the page"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="mt-1 text-[11px] text-destructive"
                />
              )}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel>Description</FieldLabel>
              <Textarea
                {...field}
                rows={2}
                placeholder="Short paragraph under the heading"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="mt-1 text-[11px] text-destructive"
                />
              )}
            </Field>
          )}
        />

        <Controller
          name="meta_title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel>Meta title</FieldLabel>
              <Input
                {...field}
                placeholder="Used for search engines and browser tabs"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="mt-1 text-[11px] text-destructive"
                />
              )}
            </Field>
          )}
        />

        <Controller
          name="meta_description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel>Meta description</FieldLabel>
              <Textarea
                {...field}
                rows={2}
                placeholder="Summary shown in search results"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="mt-1 text-[11px] text-destructive"
                />
              )}
            </Field>
          )}
        />

        <Controller
          name="html"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel>Content</FieldLabel>
              <TipTapEditor
                content={field.value ?? ""}
                onValueChange={field.onChange}
              />
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="mt-1 text-[11px] text-destructive"
                />
              )}
            </Field>
          )}
        />

        <FaqFields control={form.control} />

        {page.kind === "tool" ? (
          <RelatedFields control={form.control} currentSlug={page.slug} />
        ) : null}

        <div className="flex items-center gap-2 pt-2">
          <Button type="submit" size="lg" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader className="animate-spin" />
                Saving
              </>
            ) : (
              "Save changes"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            nativeButton={false}
            render={<Link href="/admin/pages" />}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PageContentForm;
