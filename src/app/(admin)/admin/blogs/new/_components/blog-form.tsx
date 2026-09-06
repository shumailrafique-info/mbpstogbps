"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MultiImageUploader } from "@/components/shared/image-upader";
import TipTapEditor from "@/components/tip-tap/tip-tap-editor";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field"; // adjust import path
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import type { BlogType } from "@/drizzle/types";
import { useBlogCreate, useBlogUpdate } from "@/lib/react-query/hooks/use-blog";
import {
  type BlogSchemaValues,
  blogSchema,
} from "@/lib/validation/zod/blog.schema";

const BlogForm = ({ blog }: { blog: BlogType | undefined }) => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const { mutate: createPost, isPending } = useBlogCreate();
  const { mutate: updatePost, isPending: isUpdating } = useBlogUpdate();
  const router = useRouter();
  const form = useForm<BlogSchemaValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog?.title ?? "",
      excerpt: blog?.excerpt ?? "",
      description: blog?.description ?? "",
      meta_title: blog?.meta_title ?? "",
      meta_description: blog?.meta_description ?? "",
      slug: blog?.slug ?? "",
      html: blog?.html ?? "",
      status: blog?.status ?? "DRAFT",
      cover_image: blog?.cover_image ? [blog?.cover_image] : [],
      image_alt: blog?.image_alt ?? "",
    },
  });

  const { errors } = form.formState;

  async function onSubmit(data: BlogSchemaValues) {
    if (blog?.id) {
      await updatePost(
        { payload: data, id: blog?.id },
        {
          onSuccess: () => {
            toast.add({ title: "Blog updated successfully" });
            router.push("/admin/blogs");
          },
          onError: (err) => {
            toast.add({ title: err?.message || "Failed to update blog" });
          },
        },
      );
    } else {
      await createPost(data, {
        onSuccess: () => {
          toast.add({ title: "Blog created successfully" });
          router.push("/admin/blogs");
        },
        onError: (err) => {
          toast.add({ title: err?.message || "Failed to create blog" });
        },
      });
    }
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold text-black">
        {blog ? "Edit Blog Post" : "Create New Blog Post"}
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex max-w-100">
          <Controller
            name="cover_image"
            control={form.control}
            render={({ field }) => (
              <div className="flex w-full flex-col gap-1">
                <Label className="">Image</Label>
                <MultiImageUploader
                  value={field.value ?? []}
                  onChange={field.onChange}
                  gridClassName="grid-cols-1 gap-3"
                  className="max-w-100! w-full"
                  PreviewItemClassName="rounded-xl! h-[225px] w-[400px] overflow-hidden"
                  maxFiles={1}
                  showLimit={false}
                  onUploadingChange={setIsUploadingImage}
                  triggerClassName="rounded-xl! w-full cursor-pointer bg-white hover:bg-gray-300"
                >
                  <div className="flex h-56.25 w-100 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-white transition-all hover:border-emerald-500 hover:bg-gray-100">
                    <UploadIcon className="size-5 text-gray-500" />
                    <div className="text-xs font-medium text-gray-700">
                      Image <span className="text-red-500">*</span>
                    </div>
                  </div>
                </MultiImageUploader>
                {errors.cover_image && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cover_image.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
        {/* Title */}
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel className="">
                Title <span className="ml-0.5 text-[#6e6e6e]">*</span>
              </FieldLabel>
              <Input
                {...field}
                className=""
                placeholder="e.g. Material Futures"
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

        {/* Slug */}
        <Controller
          name="slug"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel className="">
                Slug <span className="ml-0.5 text-[#6e6e6e]">*</span>
              </FieldLabel>
              <Input
                {...field}
                className=""
                placeholder="url-friendly-slug"
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

        {/* Excerpt (textarea) */}
        <Controller
          name="excerpt"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel className="">
                Excerpt <span className="ml-0.5 text-[#6e6e6e]">*</span>
              </FieldLabel>
              <Textarea
                {...field}
                rows={2}
                className=""
                placeholder="Short summary of the post"
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
          name="image_alt"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel className="">
                Image alt text <span className="ml-0.5 text-[#6e6e6e]">*</span>
              </FieldLabel>
              <Textarea
                {...field}
                rows={2}
                className=""
                placeholder="image alt text"
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

        {/* Meta Title */}
        <Controller
          name="meta_title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel className="">
                Meta Title <span className="ml-0.5 text-[#6e6e6e]">*</span>
              </FieldLabel>
              <Input
                {...field}
                className=""
                placeholder="SEO title"
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

        {/* Meta Description */}
        <Controller
          name="meta_description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel className="">
                Meta Description{" "}
                <span className="ml-0.5 text-[#6e6e6e]">*</span>
              </FieldLabel>
              <Textarea
                {...field}
                rows={2}
                className=""
                placeholder="SEO meta description"
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

        {/* HTML Content */}
        <Controller
          name="html"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel className="">
                Content <span className="ml-0.5 text-[#6e6e6e]">*</span>
              </FieldLabel>
              <TipTapEditor
                content={field.value}
                onValueChange={field.onChange}
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

        {/* Status (Select) */}
        <Controller
          name="status"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel className="">
                Status <span className="ml-0.5 text-[#6e6e6e]">*</span>
              </FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  aria-invalid={fieldState.invalid}
                  className="w-full"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>

                  <SelectItem value="PUBLISHED">Published</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="mt-1 text-[11px] text-red-500"
                />
              )}
            </Field>
          )}
        />
        <div className="col-span-2 w-full">
          <Button
            type="submit"
            disabled={isPending || isUploadingImage || isUpdating}
            className="mt-4 w-full"
          >
            {(isPending || isUploadingImage || isUpdating) && (
              <Loader className="mr-2 size-4 animate-spin" />
            )}

            {isUploadingImage
              ? "Uploading Image..."
              : blog
                ? isUpdating
                  ? "Updating Blog..."
                  : "Update Blog"
                : isPending
                  ? "Creating Blog..."
                  : "Create Blog"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
