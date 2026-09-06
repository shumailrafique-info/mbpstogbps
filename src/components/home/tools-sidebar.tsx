import {
  FONT_GENERATORS,
  GENERATORS,
  POPULAR_GENERATORS,
  TEXT_GENERATORS,
} from "@/lib/navigation";
import { GeneratorGrid } from "./generator-grid";
import { GeneratorSearch } from "./generator-search";

export function ToolsSidebar({ className }: { className?: string }) {
  const searchIndex = GENERATORS.map((generator) => ({
    slug: generator.slug,
    name: generator.name,
    icon: generator.icon,
  }));

  return (
    <aside className={className} aria-label="Browse generators">
      <div>
        <GeneratorSearch entries={searchIndex} />
      </div>

      <GeneratorGrid
        id="text-generators"
        heading="Text Generators"
        description="Restyle whatever you type - bold, italic, cursive, bubble, glitch and more."
        items={TEXT_GENERATORS}
      />

      <GeneratorGrid
        id="font-generators"
        heading="Font Generators"
        description="Fonts grouped around a look - gothic, pixel, medieval, minecraft and more."
        items={FONT_GENERATORS}
      />

      <GeneratorGrid
        id="popular"
        heading="Popular"
        description="The pages people reach for most often."
        items={POPULAR_GENERATORS}
      />
    </aside>
  );
}
