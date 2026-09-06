import { ToolPage } from "@/components/tools/tool-page";
import { UnitConverter } from "@/components/tools/unit-converter";
import { pageMetadata } from "@/server/page-metadata";

const SLUG = "mbs-to-mbps";

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
        defaultFrom="mbyteps"
        defaultTo="mbps"
        defaultValue={12.5}
        presets={[1, 5, 10, 12.5, 25, 50, 125]}
        tableValues={[0.5, 1, 2.5, 5, 10, 12.5, 25, 50, 62.5, 125]}
        insights
      />
    </ToolPage>
  );
}
