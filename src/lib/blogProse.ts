export const BLOG_PROSE = [
  "prose prose-slate max-w-none",

  // Headings
  "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-slate-900",
  "prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg",

  // Body copy
  "prose-p:text-slate-700 prose-li:text-slate-700 prose-strong:text-slate-900",

  // Links carry the blue accent
  "prose-a:font-medium prose-a:text-blue-600 prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-blue-700",

  // Quotes and code
  "prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50/50 prose-blockquote:py-1 prose-blockquote:pr-4 prose-blockquote:text-slate-700 prose-blockquote:not-italic",
  "prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-slate-800 prose-code:before:content-none prose-code:after:content-none",
  "prose-pre:rounded-lg prose-pre:border prose-pre:border-slate-200 prose-pre:bg-slate-900",

  // Media - iframes cover the YouTube embeds the editor can insert
  "prose-img:rounded-lg prose-img:border prose-img:border-slate-200",
  "prose-hr:border-slate-200",
  "[&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:w-full [&_iframe]:rounded-lg",

  // Tiptap writes alignment as a style attribute; keep it working either way
  "[&_[style*='text-align:center']]:text-center [&_[style*='text-align:right']]:text-right [&_[style*='text-align:justify']]:text-justify",
].join(" ");
