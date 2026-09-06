/**
 * Prose styling for editor-authored HTML.
 *
 * Tailwind Typography is driven entirely through its own CSS variables here,
 * pointed at the theme tokens. That means one definition covers light and dark
 * with no `dark:` variants to keep in sync, and the palette can change without
 * touching this file.
 */
export const BLOG_PROSE = [
  "prose max-w-none",

  // Typography's colour variables, mapped onto the theme.
  "[--tw-prose-body:var(--muted-foreground)]",
  "[--tw-prose-headings:var(--foreground)]",
  "[--tw-prose-lead:var(--muted-foreground)]",
  "[--tw-prose-links:var(--primary)]",
  "[--tw-prose-bold:var(--foreground)]",
  "[--tw-prose-counters:var(--muted-foreground)]",
  "[--tw-prose-bullets:var(--primary)]",
  "[--tw-prose-hr:var(--border)]",
  "[--tw-prose-quotes:var(--foreground)]",
  "[--tw-prose-quote-borders:var(--primary)]",
  "[--tw-prose-captions:var(--muted-foreground)]",
  "[--tw-prose-code:var(--foreground)]",
  "[--tw-prose-pre-code:var(--foreground)]",
  "[--tw-prose-pre-bg:var(--muted)]",
  "[--tw-prose-th-borders:var(--border)]",
  "[--tw-prose-td-borders:var(--border)]",

  // Headings
  "prose-headings:font-semibold prose-headings:tracking-tight",
  "prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg",

  // Links
  "prose-a:font-medium prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-foreground",

  // Quotes and code
  "prose-blockquote:rounded-r-md prose-blockquote:bg-muted/60 prose-blockquote:py-1 prose-blockquote:pr-4 prose-blockquote:not-italic",
  "prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:before:content-none prose-code:after:content-none",
  "prose-pre:rounded-lg prose-pre:border prose-pre:border-border",

  // Tables come from the editor as plain markup
  "prose-th:text-foreground",

  // Media - iframes cover the YouTube embeds the editor can insert
  "prose-img:rounded-lg prose-img:border prose-img:border-border",

  "[&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:w-full [&_iframe]:rounded-lg",

  // Tiptap writes alignment as a style attribute; keep it working either way
  "[&_[style*='text-align:center']]:text-center [&_[style*='text-align:right']]:text-right [&_[style*='text-align:justify']]:text-justify",
].join(" ");
