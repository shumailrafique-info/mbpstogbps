"use client";

import { type Editor, useEditorState } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  ImageIcon,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Quote,
  Redo,
  SquarePlay,
  Strikethrough,
  Type,
  Underline,
  Undo,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/** rel values written onto the anchor. Both keep the security tokens. */
const NOFOLLOW_REL = "noopener noreferrer nofollow";
const DOFOLLOW_REL = "noopener noreferrer";

const LinkPopover = ({
  isActive,
  currentHref,
  currentRel,
  onSubmit,
}: {
  isActive: boolean;
  currentHref: string;
  currentRel: string;
  onSubmit: (href: string, rel: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [rel, setRel] = useState(DOFOLLOW_REL);

  // Seed from the existing link each time the popover opens. An anchor with no
  // rel of its own is a new link, and new links are dofollow - only an explicit
  // nofollow already on the anchor selects nofollow.
  function onOpenChange(next: boolean) {
    if (next) {
      setUrl(currentHref);
      setRel(currentRel.includes("nofollow") ? NOFOLLOW_REL : DOFOLLOW_REL);
    }
    setOpen(next);
  }

  function apply() {
    const value = url.trim();
    if (!value) return;

    onSubmit(value, rel);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger
        render={
          <Button
            variant={isActive ? "default" : "outline"}
            type="button"
            size="sm"
            aria-label={isActive ? "Edit link" : "Add link"}
          />
        }
      >
        <Link2 className="h-4 w-4" />
      </PopoverTrigger>

      <PopoverContent className="w-72">
        <label
          className="text-xs font-medium text-muted-foreground"
          htmlFor="tiptap-link-url"
        >
          URL
        </label>
        <Input
          id="tiptap-link-url"
          value={url}
          autoFocus
          placeholder="https://example.com"
          onChange={(event) => setUrl(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              apply();
            }
          }}
        />

        <label
          className="text-xs font-medium text-muted-foreground"
          htmlFor="tiptap-link-rel"
        >
          Link type
        </label>
        <select
          id="tiptap-link-rel"
          value={rel}
          onChange={(event) => setRel(event.target.value)}
          className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm text-foreground"
        >
          <option value={DOFOLLOW_REL}>Dofollow (default)</option>
          <option value={NOFOLLOW_REL}>Nofollow</option>
        </select>
        <p className="text-[11px] text-muted-foreground">
          Links are dofollow by default. Choose nofollow for sponsored,
          user-submitted or otherwise untrusted destinations.
        </p>

        <Button type="button" size="sm" onClick={apply} disabled={!url.trim()}>
          {isActive ? "Update link" : "Add link"}
        </Button>
      </PopoverContent>
    </Popover>
  );
};
const UrlPopover = ({
  icon,
  label,
  placeholder,
  actionLabel,
  isActive,
  onSubmit,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  actionLabel: string;
  isActive?: boolean;
  onSubmit: (url: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  function apply() {
    const value = url.trim();
    if (!value) return;

    onSubmit(value);
    setUrl("");
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant={isActive ? "default" : "outline"}
            type="button"
            size="sm"
            aria-label={label}
          />
        }
      >
        {icon}
      </PopoverTrigger>

      <PopoverContent className="w-72">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <Input
          value={url}
          autoFocus
          placeholder={placeholder}
          onChange={(event) => setUrl(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              apply();
            }
          }}
        />
        <Button type="button" size="sm" onClick={apply} disabled={!url.trim()}>
          {actionLabel}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

const TipTapMenuBar = ({ editor }: { editor: Editor }) => {
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor.isActive("bold"),
      isItalic: editor.isActive("italic"),
      isUnderline: editor.isActive("underline"),
      isStrike: editor.isActive("strike"),
      isLink: editor.isActive("link"),
      linkHref: (editor.getAttributes("link").href as string) ?? "",
      linkRel: (editor.getAttributes("link").rel as string) ?? "",
      isBulletList: editor.isActive("bulletList"),
      isOrderedList: editor.isActive("orderedList"),
      isBlockquote: editor.isActive("blockquote"),
      isCodeBlock: editor.isActive("codeBlock"),
      alignment: (["left", "center", "right", "justify"] as const).find(
        (value) => editor.isActive({ textAlign: value }),
      ),
      headingLevel: ([1, 2, 3, 4, 5, 6] as const).find((level) =>
        editor.isActive("heading", { level }),
      ),
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    }),
  });

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      {/* Text Formatting */}
      <div className="flex gap-2 border-r pr-2">
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={state.isBold ? "default" : "outline"}
          type="button"
          size="sm"
          aria-label="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          variant={state.isItalic ? "default" : "outline"}
          size="sm"
          type="button"
          aria-label="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          variant={state.isUnderline ? "default" : "outline"}
          size="sm"
          type="button"
          aria-label="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          variant={state.isStrike ? "default" : "outline"}
          size="sm"
          type="button"
          aria-label="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                type="button"
                size="sm"
                aria-label="Heading"
              />
            }
          >
            <Type className="h-4 w-4" />
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2">
            <div className="grid grid-cols-2 gap-1">
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <Button
                  key={level}
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
                      .run()
                  }
                  variant={state.headingLevel === level ? "default" : "ghost"}
                  size="sm"
                  type="button"
                  className="h-8"
                >
                  H{level}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Text Alignment */}
      <div className="flex gap-2 border-r pr-2">
        <Button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          variant={state.alignment === "left" ? "default" : "outline"}
          size="sm"
          type="button"
          aria-label="Align left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          variant={state.alignment === "center" ? "default" : "outline"}
          size="sm"
          type="button"
          aria-label="Align center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          variant={state.alignment === "right" ? "default" : "outline"}
          size="sm"
          type="button"
          aria-label="Align right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          variant={state.alignment === "justify" ? "default" : "outline"}
          size="sm"
          type="button"
          aria-label="Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </Button>
      </div>

      {/* Lists & Blocks */}
      <div className="flex gap-2 border-r pr-2">
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={state.isBulletList ? "default" : "outline"}
          size="sm"
          type="button"
          aria-label="Bullet list"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={state.isOrderedList ? "default" : "outline"}
          size="sm"
          type="button"
          aria-label="Numbered list"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          variant={state.isBlockquote ? "default" : "outline"}
          size="sm"
          type="button"
          aria-label="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          variant={state.isCodeBlock ? "default" : "outline"}
          size="sm"
          type="button"
          aria-label="Code block"
        >
          <Code className="h-4 w-4" />
        </Button>
      </div>

      {/* Media & Links */}
      <div className="flex gap-2 border-r pr-2">
        <LinkPopover
          isActive={state.isLink}
          currentHref={state.linkHref}
          currentRel={state.linkRel}
          onSubmit={(href, rel) =>
            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href, rel })
              .run()
          }
        />
        {state.isLink ? (
          <Button
            type="button"
            onClick={() =>
              editor.chain().focus().extendMarkRange("link").unsetLink().run()
            }
            variant="outline"
            size="sm"
            aria-label="Remove link"
          >
            <Link2Off className="h-4 w-4" />
          </Button>
        ) : null}
        <UrlPopover
          icon={<ImageIcon className="h-4 w-4" />}
          label="Image URL"
          placeholder="https://example.com/photo.jpg"
          actionLabel="Insert image"
          onSubmit={(url) =>
            editor.chain().focus().setImage({ src: url }).run()
          }
        />
        <UrlPopover
          icon={<SquarePlay className="h-4 w-4" />}
          label="YouTube URL"
          placeholder="https://youtube.com/watch?v=…"
          actionLabel="Embed video"
          onSubmit={(url) =>
            editor.chain().focus().setYoutubeVideo({ src: url }).run()
          }
        />
      </div>

      {/* History */}
      <div className="flex gap-2">
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!state.canUndo}
          variant="outline"
          type="button"
          size="sm"
          aria-label="Undo"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!state.canRedo}
          variant="outline"
          type="button"
          size="sm"
          aria-label="Redo"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TipTapMenuBar;
