/**
 * The tool registry.
 *
 * This is the single list every other part of the site derives from: the
 * header, the sidebar, the home page grid, the sitemap, the related-tools
 * picker and the pages the dashboard offers for editing. Adding a tool means
 * adding a route folder and an entry here - nothing else needs to know.
 */

export type ToolGroupId = "converter" | "calculator";

export type ToolEntry = {
  /** Also the `page_content` slug. The home tool uses "home". */
  slug: string;
  name: string;
  /** Route the tool lives at, including the leading slash. */
  path: string;
  /** Compact label for cards and chips, e.g. "Mbps -> Gbps". */
  badge: string;
  group: ToolGroupId;
  /** One line, used on cards and in the search list. */
  summary: string;
  popular?: boolean;
};

export const HOME_TOOL_SLUG = "home";

export const TOOLS: readonly ToolEntry[] = [
  {
    slug: HOME_TOOL_SLUG,
    name: "Mbps to Gbps Converter",
    path: "/",
    badge: "Mbps → Gbps",
    group: "converter",
    summary: "Turn a megabit-per-second figure into gigabits per second.",
    popular: true,
  },
  {
    slug: "gbps-to-mbps",
    name: "Gbps to Mbps Converter",
    path: "/gbps-to-mbps",
    badge: "Gbps → Mbps",
    group: "converter",
    summary: "Read a gigabit plan in the megabits your devices report.",
    popular: true,
  },
  {
    slug: "mbps-to-mbs",
    name: "Mbps to MB/s Converter",
    path: "/mbps-to-mbs",
    badge: "Mbps → MB/s",
    group: "converter",
    summary: "See the download speed your browser will actually show.",
    popular: true,
  },
  {
    slug: "mbs-to-mbps",
    name: "MB/s to Mbps Converter",
    path: "/mbs-to-mbps",
    badge: "MB/s → Mbps",
    group: "converter",
    summary: "Convert a measured transfer rate back to line speed.",
    popular: true,
  },
  {
    slug: "gbps-to-mbs",
    name: "Gbps to MB/s Converter",
    path: "/gbps-to-mbs",
    badge: "Gbps → MB/s",
    group: "converter",
    summary: "Find the real ceiling of a gigabit connection in megabytes.",
  },
  {
    slug: "kbps-to-mbps",
    name: "Kbps to Mbps Converter",
    path: "/kbps-to-mbps",
    badge: "Kbps → Mbps",
    group: "converter",
    summary: "Scale kilobit bitrates and legacy speeds up to megabits.",
  },
  {
    slug: "download-time-calculator",
    name: "Download Time Calculator",
    path: "/download-time-calculator",
    badge: "Size + speed → time",
    group: "calculator",
    summary: "How long a file takes to arrive on your connection.",
    popular: true,
  },
  {
    slug: "upload-time-calculator",
    name: "Upload Time Calculator",
    path: "/upload-time-calculator",
    badge: "Size + upload → time",
    group: "calculator",
    summary: "Time a backup or video upload against your slower upstream.",
  },
  {
    slug: "bandwidth-calculator",
    name: "Bandwidth Calculator",
    path: "/bandwidth-calculator",
    badge: "Users → Mbps",
    group: "calculator",
    summary: "Size a connection for a household, office or venue.",
    popular: true,
  },
  {
    slug: "data-transfer-calculator",
    name: "Data Transfer Calculator",
    path: "/data-transfer-calculator",
    badge: "Speed + time → data",
    group: "calculator",
    summary: "Work out how much data moves in a given window.",
  },
  {
    slug: "streaming-bandwidth-calculator",
    name: "Streaming Bandwidth Calculator",
    path: "/streaming-bandwidth-calculator",
    badge: "Streams → Mbps",
    group: "calculator",
    summary: "Add up every screen streaming at once, by service and quality.",
  },
  {
    slug: "internet-speed-calculator",
    name: "Internet Speed Requirement Calculator",
    path: "/internet-speed-calculator",
    badge: "Activities → plan",
    group: "calculator",
    summary: "Build a recommended plan from what your household actually does.",
  },
];

export const CONVERTER_TOOLS = TOOLS.filter(
  (tool) => tool.group === "converter",
);
export const CALCULATOR_TOOLS = TOOLS.filter(
  (tool) => tool.group === "calculator",
);
export const POPULAR_TOOLS = TOOLS.filter((tool) => tool.popular);

const BY_SLUG = new Map(TOOLS.map((tool) => [tool.slug, tool]));

export function toolBySlug(slug: string) {
  return BY_SLUG.get(slug);
}

/** Every tool except the one being viewed, for sidebars and related lists. */
export function otherTools(slug: string) {
  return TOOLS.filter((tool) => tool.slug !== slug);
}

export const GROUP_LABELS: Record<ToolGroupId, string> = {
  converter: "Converters",
  calculator: "Calculators",
};

export const GROUP_DESCRIPTIONS: Record<ToolGroupId, string> = {
  converter:
    "Move a single figure between bits, bytes and every metric prefix in between.",
  calculator:
    "Turn speeds into answers - transfer times, capacity and the plan you need.",
};
