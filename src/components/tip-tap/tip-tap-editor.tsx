"use client";
import { Image } from "@tiptap/extension-image";
import { TextAlign } from "@tiptap/extension-text-align";
import { Youtube } from "@tiptap/extension-youtube";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { BLOG_PROSE } from "@/lib/blogProse";
import TipTapMenuBar from "./tip-tap-tool-bar";

const TipTapEditor = ({
  onValueChange,
  content = "",
}: {
  onValueChange: (content: string) => void;
  content: string;
}) => {
  const editor = useEditor({
    autofocus: false,
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          autolink: true,
          // Dofollow by default; the toolbar opts an individual link out.
          HTMLAttributes: { rel: "noopener noreferrer" },
        },
      }),
      Youtube.configure({
        inline: false,
        controls: true,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: { class: `${BLOG_PROSE} min-h-[320px] focus:outline-none` },
    },
    content,
    onUpdate: ({ editor }) => {
      onValueChange(editor.getHTML());
    },
  });

  return (
    <div className="font-inter overflow-hidden rounded-xl border border-border dark:border-white/5">
      {!editor ? (
        <div className="w-full py-8 text-center">
          <span className="text-sm text-muted-foreground">
            Loading editor...
          </span>
        </div>
      ) : (
        <>
          <div className="flex w-full justify-start border-b border-border bg-muted/70 px-4 py-2 dark:border-white/5">
            <TipTapMenuBar editor={editor} />
          </div>

          <div className="px-4 py-3">
            <EditorContent editor={editor} />
          </div>
        </>
      )}
    </div>
  );
};

export default TipTapEditor;
