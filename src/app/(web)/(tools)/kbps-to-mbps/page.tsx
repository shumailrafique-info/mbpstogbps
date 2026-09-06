import { ToolPage } from "@/components/tools/tool-page";
import { UnitConverter } from "@/components/tools/unit-converter";
import { pageMetadata } from "@/server/page-metadata";

const SLUG = "kbps-to-mbps";

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
        defaultFrom="kbps"
        defaultTo="mbps"
        defaultValue={1000}
        presets={[56, 256, 512, 1000, 2000, 5000, 10000]}
        tableValues={[
          56, 128, 256, 512, 1000, 2048, 5000, 10000, 25000, 100000,
        ]}
        insights
      />
    </ToolPage>
  );
}
