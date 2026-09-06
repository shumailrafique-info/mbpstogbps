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
        className="size-12 shrink-0 rounded-md border border-slate-200 object-cover"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-900">{name}</p>
        <p
          className="truncate font-mono text-xs text-slate-500"
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
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 px-6 py-6 sm:px-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Image upload
          </h1>
          <p className="mt-1 text-sm text-slate-500">
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
          triggerClassName="rounded-lg! w-full cursor-pointer bg-white hover:bg-slate-50"
        >
          <div className="flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-white transition-all hover:border-blue-500 hover:bg-blue-50/40">
            <UploadIcon className="size-5 text-slate-500" />
            <div className="text-xs font-medium text-slate-700">
              Drop images here or click to browse
            </div>
            <div className="text-[11px] text-slate-500">
              Up to {MAX_FILES} files, 10MB each
            </div>
          </div>
        </MultiImageUploader>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-slate-900">
              Uploaded URLs
            </h2>
            {isUploading ? (
              <span className="text-xs text-blue-700">Uploading…</span>
            ) : null}
          </div>

          {files.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-slate-300 px-6 py-12 text-center">
              <ImageIcon className="size-5 text-slate-400" />
              <p className="text-sm font-medium text-slate-900">
                No images uploaded yet
              </p>
              <p className="max-w-sm text-sm text-slate-500">
                URLs appear here as soon as an upload finishes.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200">
              {files.map((file) => (
                <UrlRow key={file.key} file={file} />
              ))}
            </ul>
          )}
        </section>

        <p className="text-xs text-slate-500">
          This list is only for the current session. The images stay in storage
          permanently - copy any URL you still need before leaving the page.
        </p>
      </div>
    </div>
  );
};

export default MediaUploader;
