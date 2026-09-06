/**
 * Real-world reference figures the calculators are built on.
 *
 * Everything here is a published or widely reported average rather than a
 * guarantee, which is why the UI presents them as starting points that can be
 * edited. Sizes are stored in bytes and rates in megabits per second, the units
 * the sources actually quote.
 */

export type FilePreset = {
  id: string;
  label: string;
  /** Size in bytes, decimal (a 25 GB film is 25,000,000,000 bytes here). */
  bytes: number;
  group: "Media" | "Work" | "Games" | "Backups";
};

export const FILE_PRESETS: readonly FilePreset[] = [
  { id: "song", label: "MP3 song (5 min)", bytes: 5e6, group: "Media" },
  {
    id: "podcast",
    label: "Podcast episode (1 h)",
    bytes: 60e6,
    group: "Media",
  },
  { id: "photo", label: "Phone photo (12 MP)", bytes: 5e6, group: "Media" },
  { id: "raw-photo", label: "RAW photo", bytes: 45e6, group: "Media" },
  { id: "album", label: "1,000 photo library", bytes: 5e9, group: "Media" },
  { id: "episode", label: "TV episode (1080p)", bytes: 1.5e9, group: "Media" },
  { id: "movie-hd", label: "Movie (1080p)", bytes: 4e9, group: "Media" },
  { id: "movie-4k", label: "Movie (4K HDR)", bytes: 25e9, group: "Media" },
  { id: "footage", label: "1 h of 4K footage", bytes: 45e9, group: "Media" },
  { id: "pdf", label: "PDF report", bytes: 2e6, group: "Work" },
  { id: "deck", label: "Slide deck with images", bytes: 25e6, group: "Work" },
  { id: "app", label: "Mobile app install", bytes: 150e6, group: "Work" },
  { id: "iso", label: "Linux ISO", bytes: 5e9, group: "Work" },
  { id: "vm", label: "Virtual machine image", bytes: 40e9, group: "Work" },
  { id: "indie-game", label: "Indie game", bytes: 8e9, group: "Games" },
  { id: "aaa-game", label: "AAA console game", bytes: 100e9, group: "Games" },
  { id: "game-patch", label: "Game patch", bytes: 12e9, group: "Games" },
  { id: "phone-backup", label: "Phone backup", bytes: 128e9, group: "Backups" },
  {
    id: "laptop-backup",
    label: "Laptop backup",
    bytes: 512e9,
    group: "Backups",
  },
  { id: "nas", label: "NAS archive", bytes: 4e12, group: "Backups" },
];

export type StreamingProfile = {
  id: string;
  service: string;
  quality: string;
  /** Sustained download in Mbps. */
  mbps: number;
};

/**
 * Per-stream bandwidth by service and quality. Figures follow each provider's
 * own published recommendation where one exists, rounded to the value they
 * quote rather than the codec's theoretical bitrate.
 */
export const STREAMING_PROFILES: readonly StreamingProfile[] = [
  { id: "netflix-sd", service: "Netflix", quality: "SD (480p)", mbps: 1 },
  { id: "netflix-hd", service: "Netflix", quality: "HD (1080p)", mbps: 5 },
  { id: "netflix-4k", service: "Netflix", quality: "4K HDR", mbps: 15 },
  { id: "youtube-480", service: "YouTube", quality: "480p", mbps: 1.1 },
  { id: "youtube-1080", service: "YouTube", quality: "1080p", mbps: 5 },
  { id: "youtube-4k", service: "YouTube", quality: "4K", mbps: 20 },
  { id: "youtube-8k", service: "YouTube", quality: "8K", mbps: 50 },
  { id: "disney-hd", service: "Disney+", quality: "HD (1080p)", mbps: 5 },
  { id: "disney-4k", service: "Disney+", quality: "4K UHD", mbps: 25 },
  { id: "prime-hd", service: "Prime Video", quality: "HD (1080p)", mbps: 5 },
  { id: "prime-4k", service: "Prime Video", quality: "4K UHD", mbps: 15 },
  { id: "twitch-720", service: "Twitch", quality: "720p60", mbps: 3.5 },
  { id: "twitch-1080", service: "Twitch", quality: "1080p60", mbps: 6 },
  {
    id: "spotify",
    service: "Spotify",
    quality: "Very high (320 kbps)",
    mbps: 0.32,
  },
  { id: "zoom-hd", service: "Zoom", quality: "1080p call", mbps: 3.8 },
  { id: "zoom-group", service: "Zoom", quality: "Group call (HD)", mbps: 4 },
  { id: "meet-hd", service: "Google Meet", quality: "HD call", mbps: 3.2 },
  { id: "cloud-gaming", service: "Cloud gaming", quality: "1080p60", mbps: 15 },
  { id: "cloud-gaming-4k", service: "Cloud gaming", quality: "4K60", mbps: 35 },
];

export type Activity = {
  id: string;
  label: string;
  /** Download need per simultaneous instance, in Mbps. */
  mbps: number;
  /** Upload need per simultaneous instance, in Mbps. */
  uploadMbps: number;
  group: "Everyday" | "Streaming" | "Work" | "Play" | "Home";
  /** Set when the activity is hurt more by latency than by bandwidth. */
  latencySensitive?: boolean;
};

export const ACTIVITIES: readonly Activity[] = [
  {
    id: "browsing",
    label: "Web browsing",
    mbps: 3,
    uploadMbps: 0.5,
    group: "Everyday",
  },
  {
    id: "email",
    label: "Email and messaging",
    mbps: 1,
    uploadMbps: 0.5,
    group: "Everyday",
  },
  {
    id: "social",
    label: "Social media scrolling",
    mbps: 5,
    uploadMbps: 1,
    group: "Everyday",
  },
  {
    id: "music",
    label: "Music streaming",
    mbps: 0.5,
    uploadMbps: 0.1,
    group: "Everyday",
  },
  {
    id: "sd",
    label: "SD video stream",
    mbps: 3,
    uploadMbps: 0.1,
    group: "Streaming",
  },
  {
    id: "hd",
    label: "HD video stream",
    mbps: 5,
    uploadMbps: 0.1,
    group: "Streaming",
  },
  {
    id: "uhd",
    label: "4K video stream",
    mbps: 25,
    uploadMbps: 0.1,
    group: "Streaming",
  },
  {
    id: "video-call",
    label: "HD video call",
    mbps: 4,
    uploadMbps: 4,
    group: "Work",
    latencySensitive: true,
  },
  {
    id: "vpn",
    label: "Work VPN / remote desktop",
    mbps: 10,
    uploadMbps: 5,
    group: "Work",
    latencySensitive: true,
  },
  {
    id: "cloud-sync",
    label: "Cloud file sync",
    mbps: 10,
    uploadMbps: 10,
    group: "Work",
  },
  {
    id: "gaming",
    label: "Online gaming",
    mbps: 10,
    uploadMbps: 3,
    group: "Play",
    latencySensitive: true,
  },
  {
    id: "cloud-gaming",
    label: "Cloud gaming",
    mbps: 25,
    uploadMbps: 2,
    group: "Play",
    latencySensitive: true,
  },
  {
    id: "downloads",
    label: "Large game downloads",
    mbps: 50,
    uploadMbps: 1,
    group: "Play",
  },
  {
    id: "smart-home",
    label: "Smart home devices",
    mbps: 2,
    uploadMbps: 1,
    group: "Home",
  },
  {
    id: "security-cam",
    label: "4K security camera",
    mbps: 4,
    uploadMbps: 8,
    group: "Home",
  },
  {
    id: "backup",
    label: "Overnight cloud backup",
    mbps: 5,
    uploadMbps: 20,
    group: "Home",
  },
];

export type Efficiency = {
  id: string;
  label: string;
  /** Share of the advertised rate that reaches the file. */
  factor: number;
  hint: string;
};

/**
 * Advertised speed is never what lands on disk: protocol headers, encryption,
 * Wi-Fi retransmits and a busy server all take a cut. These are the three
 * assumptions worth offering.
 */
export const EFFICIENCIES: readonly Efficiency[] = [
  {
    id: "theoretical",
    label: "Theoretical",
    factor: 1,
    hint: "Textbook maths with no overhead at all. Useful for checking a formula, optimistic for planning.",
  },
  {
    id: "typical",
    label: "Real world",
    factor: 0.85,
    hint: "About 85% of the advertised rate, which is what a healthy wired connection tends to deliver.",
  },
  {
    id: "congested",
    label: "Busy network",
    factor: 0.6,
    hint: "Peak-hour Wi-Fi with several devices competing. Plan around this if the number has to hold up.",
  },
];

export const DEFAULT_EFFICIENCY = "typical";

export function efficiency(id: string) {
  return EFFICIENCIES.find((item) => item.id === id) ?? EFFICIENCIES[1];
}

/** Connection tiers used for the "how does this compare" tables. */
export const SPEED_TIERS: readonly { label: string; mbps: number }[] = [
  { label: "DSL", mbps: 10 },
  { label: "Basic broadband", mbps: 25 },
  { label: "Standard cable", mbps: 100 },
  { label: "Fast cable", mbps: 300 },
  { label: "Gigabit fibre", mbps: 1000 },
  { label: "Multi-gig fibre", mbps: 2000 },
];
