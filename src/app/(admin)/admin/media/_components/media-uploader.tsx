"use client";

import { Check, Copy, ImageIcon, UploadIcon } from "lucide-react";
import { useState } from "react";
import {
  MultiImageUploader,
  type UploadedFile,
} from "@/components/shared/image-upader";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { writeToClipboard } from "@/lib/clipboard";

const MAX_FILES = 20;

function UrlRow({ file }: { file: UploadedFile }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    const ok = await writeToClipboard(file.url);

    if (!ok) {
      toast.add({ title: "Could not copy the URL" });
      return;
    }

    setCopied(true);
    toast.add({ title: "Image URL copied" });
    setTimeout(() => setCopied(false), 1800);
  }

  // The uploader names keys `<uuid>-<original name>`; show the readable half.
  const name = file.key.replace(/^[0-9a-f-]{36}-/i, "");

  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <img
        src={file.url}
        alt=""
        className="size-12 shrink-0 rounded-md border border-border object-cover"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{name}</p>
        <p
          className="truncate font-mono text-xs text-muted-foreground"
          title={file.url}
        >
          {file.url}
        </p>
      </div>

      <Button
        type="button"
        variant={copied ? "default" : "outline"}
        size="sm"
        onClick={onCopy}
        aria-label={`Copy URL for ${name}`}
        className="shrink-0"
      >
        {copied ? <Check /> : <Copy />}
        {copied ? "Copied" : "Copy URL"}
      </Button>
    </li>
  );
}

const MediaUploader = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  async function copyAll() {
    const ok = await writeToClipboard(files.map((f) => f.url).join("\n"));
    toast.add({
      title: ok ? `Copied ${files.length} URLs` : "Could not copy the URLs",
    });
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border px-6 py-6 sm:px-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Image upload
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload an image, copy its URL, then paste it into a blog post or a
            page's content.
          </p>
        </div>

        {files.length > 1 ? (
          <Button variant="outline" size="lg" onClick={copyAll}>
            <Copy />
            Copy all {files.length} URLs
          </Button>
        ) : null}
      </div>

      <div className="space-y-6 px-6 py-6 sm:px-8">
        <MultiImageUploader
          value={files}
          onChange={setFiles}
          onUploadingChange={setIsUploading}
          maxFiles={MAX_FILES}
          className="w-full max-w-none!"
          gridClassName="grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6"
          PreviewItemClassName="rounded-lg! h-32 w-full overflow-hidden"
          triggerClassName="rounded-lg! w-full cursor-pointer bg-card hover:bg-muted"
        >
          <div className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-card transition-all hover:border-primary hover:bg-accent/60">
            <UploadIcon className="size-5 text-muted-foreground" />
            <div className="text-xs font-medium text-foreground">
              Drop images here or click to browse
            </div>
            <div className="text-[11px] text-muted-foreground">
              Up to {MAX_FILES} files, 10MB each
            </div>
          </div>
        </MultiImageUploader>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              Uploaded URLs
            </h2>
            {isUploading ? (
              <span className="text-xs text-primary">Uploading…</span>
            ) : null}
          </div>

          {files.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border px-6 py-12 text-center">
              <ImageIcon className="size-5 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">
                No images uploaded yet
              </p>
              <p className="max-w-sm text-sm text-muted-foreground">
                URLs appear here as soon as an upload finishes.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border rounded-lg border border-border">
              {files.map((file) => (
                <UrlRow key={file.key} file={file} />
              ))}
            </ul>
          )}
        </section>

        <p className="text-xs text-muted-foreground">
          This list is only for the current session. The images stay in storage
          permanently - copy any URL you still need before leaving the page.
        </p>
      </div>
    </div>
  );
};

export default MediaUploader;
