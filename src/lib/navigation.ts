export type NavGroupId = "text" | "font";

export type NavEntry = {
  slug: string;
  name: string;
  icon: string;
  group: NavGroupId;
  popular?: boolean;
};

export const GENERATORS: readonly NavEntry[] = [
  {
    slug: "bubble-text-generator",
    name: "Bubble Text Generator",
    icon: "🅑",
    group: "text",
    popular: true,
  },
  {
    slug: "christmas-font",
    name: "Christmas Font Generator",
    icon: "🎄",
    group: "font",
  },
  {
    slug: "cursive-text-generator",
    name: "Cursive Font Generator",
    icon: "𝒞",
    group: "text",
    popular: true,
  },
  {
    slug: "fancy-text-generator",
    name: "Fancy Font Generator",
    icon: "₣",
    group: "text",
    popular: true,
  },
  {
    slug: "glitch-text-generator",
    name: "Glitch Text Generator",
    icon: "G̸",
    group: "text",
    popular: true,
  },
  {
    slug: "italic-text-generator",
    name: "Italic Text Generator",
    icon: "𝐼",
    group: "text",
    popular: true,
  },
  {
    slug: "number-font-generator",
    name: "Number Font Generator",
    icon: "①",
    group: "font",
  },
  {
    slug: "bold-text-generator",
    name: "Bold Text Generator",
    icon: "𝐁",
    group: "text",
    popular: true,
  },
  {
    slug: "morse-code-generator",
    name: "Morse Code Generator",
    icon: "⚡",
    group: "text",
    popular: true,
  },
  {
    slug: "small-text-generator",
    name: "Small Text Generator",
    icon: "ˢ",
    group: "text",
    popular: true,
  },
  {
    slug: "strikethrough-text",
    name: "Strikethrough Text Generator",
    icon: "S̶",
    group: "text",
    popular: true,
  },
  {
    slug: "text-reverser",
    name: "Text Reverser",
    icon: "↺",
    group: "text",
    popular: true,
  },
  {
    slug: "underline-text",
    name: "Underline Text Generator",
    icon: "U̲",
    group: "text",
  },
  {
    slug: "upside-down-text",
    name: "Upside Down Text Generator",
    icon: "ɐ",
    group: "text",
    popular: true,
  },
  {
    slug: "zalgo-text-generator",
    name: "Zalgo Text Generator",
    icon: "Z̸",
    group: "text",
    popular: true,
  },
  {
    slug: "barbie-font-generator",
    name: "Barbie Font Generator",
    icon: "🩷",
    group: "font",
    popular: true,
  },
  {
    slug: "bluey-font-generator",
    name: "Bluey Font Generator",
    icon: "🐶",
    group: "font",
  },
  {
    slug: "cursed-font-generator",
    name: "Cursed Font Generator",
    icon: "🕯",
    group: "font",
  },
  {
    slug: "death-metal-font",
    name: "Death Metal Font Generator",
    icon: "☠",
    group: "font",
  },
  {
    slug: "facebook-font",
    name: "Facebook Font Generator",
    icon: "f",
    group: "font",
    popular: true,
  },
  {
    slug: "fortnite-font",
    name: "Fortnite Font Generator",
    icon: "🔫",
    group: "font",
    popular: true,
  },
  {
    slug: "fraktur-font",
    name: "Fraktur Font Generator",
    icon: "𝔉",
    group: "font",
  },
  {
    slug: "gothic-font",
    name: "Gothic Font Generator",
    icon: "𝔊",
    group: "font",
    popular: true,
  },
  {
    slug: "gothic-text-generator",
    name: "Gothic Text Generator",
    icon: "𝔊",
    group: "text",
    popular: true,
  },
  {
    slug: "greek-font-generator",
    name: "Greek Font Generator",
    icon: "Ω",
    group: "font",
  },
  {
    slug: "hello-kitty-font",
    name: "Hello Kitty Font Generator",
    icon: "🎀",
    group: "font",
    popular: true,
  },
  {
    slug: "medieval-font",
    name: "Medieval Font Generator",
    icon: "🏰",
    group: "font",
    popular: true,
  },
  {
    slug: "metal-font-generator",
    name: "Metal Font Generator",
    icon: "🤘",
    group: "font",
  },
  {
    slug: "metallica-font",
    name: "Metallica Font Generator",
    icon: "🎸",
    group: "font",
  },
  {
    slug: "minecraft-font",
    name: "Minecraft Font Generator",
    icon: "⛏️",
    group: "font",
    popular: true,
  },
  {
    slug: "old-english-font",
    name: "Old English Font Generator",
    icon: "𝕺",
    group: "font",
    popular: true,
  },
  {
    slug: "pixel-font-generator",
    name: "Pixel Font Generator",
    icon: "🕹️",
    group: "font",
    popular: true,
  },
  {
    slug: "roblox-font-generator",
    name: "Roblox Font Generator",
    icon: "🎮",
    group: "font",
    popular: true,
  },
  {
    slug: "serif-font-generator",
    name: "Serif Font Generator",
    icon: "𝐒",
    group: "font",
  },
  {
    slug: "spongebob-font",
    name: "SpongeBob Font Generator",
    icon: "🧽",
    group: "font",
    popular: true,
  },
  {
    slug: "tiktok-font-generator",
    name: "TikTok Font Generator",
    icon: "🎵",
    group: "font",
    popular: true,
  },
  {
    slug: "typewriter-font",
    name: "Typewriter Font Generator",
    icon: "⌨️",
    group: "font",
    popular: true,
  },
  {
    slug: "weird-font-generator",
    name: "Weird Font Generator",
    icon: "ω",
    group: "font",
  },
  {
    slug: "whisper-font-generator",
    name: "Whisper Font Generator",
    icon: "ᶴ",
    group: "font",
  },
  {
    slug: "discord-font-generator",
    name: "Discord Font Generator",
    icon: "🎮",
    group: "font",
  },
  {
    slug: "twitter-font-generator",
    name: "Twitter Font Generator",
    icon: "𝕏",
    group: "font",
  },
  {
    slug: "tattoo-font-generator",
    name: "Tattoo Font Generator",
    icon: "𝔗",
    group: "font",
  },
];

export const STATIC_PAGES: readonly { slug: string; name: string }[] = [
  { slug: "about-us", name: "About Us" },
  { slug: "contact-us", name: "Contact Us" },
  { slug: "privacy-policy", name: "Privacy Policy" },
  { slug: "disclaimer", name: "Disclaimer" },
  { slug: "blogs", name: "Blog" },
];

const BY_SLUG = new Map(GENERATORS.map((g) => [g.slug, g]));

export const TEXT_GENERATORS = GENERATORS.filter((g) => g.group === "text");
export const FONT_GENERATORS = GENERATORS.filter((g) => g.group === "font");
export const POPULAR_GENERATORS = GENERATORS.filter((g) => g.popular);

export const CATEGORIES = [
  { id: "text", label: "Text Generators", items: TEXT_GENERATORS },
  { id: "font", label: "Font Generators", items: FONT_GENERATORS },
] as const;

export function resolveSlugs(slugs: readonly string[]): NavEntry[] {
  return slugs
    .map((s) => BY_SLUG.get(s))
    .filter((g): g is NavEntry => Boolean(g));
}
