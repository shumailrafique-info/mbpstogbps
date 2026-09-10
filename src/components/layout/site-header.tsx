import {
  CALCULATOR_TOOLS,
  CONVERTER_TOOLS,
  GROUP_DESCRIPTIONS,
  GROUP_LABELS,
} from "@/lib/navigation";
import { Brand } from "./brand";
import { HeaderMenu, type NavGroup } from "./header-menu";
import { ModeToggle } from "./mode-toggle";

const HEADER_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
];

const GROUPS: NavGroup[] = [
  {
    id: "converter",
    label: GROUP_LABELS.converter,
    description: GROUP_DESCRIPTIONS.converter,
    items: CONVERTER_TOOLS.map((tool) => ({
      path: tool.path,
      name: tool.name,
      badge: tool.badge,
    })),
  },
  {
    id: "calculator",
    label: GROUP_LABELS.calculator,
    description: GROUP_DESCRIPTIONS.calculator,
    items: CALCULATOR_TOOLS.map((tool) => ({
      path: tool.path,
      name: tool.name,
      badge: tool.badge,
    })),
  },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-accent/60 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        <Brand />
        <div className="ml-auto flex items-center gap-1">
          <HeaderMenu groups={GROUPS} links={HEADER_LINKS} />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
