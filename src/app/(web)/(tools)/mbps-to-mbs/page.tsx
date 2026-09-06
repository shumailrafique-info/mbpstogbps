import { ToolPage } from "@/components/tools/tool-page";
import { UnitConverter } from "@/components/tools/unit-converter";
import { pageMetadata } from "@/server/page-metadata";

const SLUG = "mbps-to-mbs";

// Statically generated; a save in the dashboard calls revalidatePath, and this
// is the fallback refresh window (2 days).
export const revalidate = 172800;

export async function generateMetadata() {
  return pageMetadata(SLUG);
}

export default function Page() {
  return (
    <ToolPage slug={SLUG}>
      <UnitConverter
        kind="rate"
        defaultFrom="mbps"
        defaultTo="mbyteps"
        defaultValue={100}
        presets={[10, 25, 50, 100, 300, 500, 1000]}
        tableValues={[1, 5, 10, 25, 50, 100, 200, 300, 500, 1000]}
        insights
      />
    </ToolPage>
  );
}
