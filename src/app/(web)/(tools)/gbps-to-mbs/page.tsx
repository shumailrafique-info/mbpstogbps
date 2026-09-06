import { ToolPage } from "@/components/tools/tool-page";
import { UnitConverter } from "@/components/tools/unit-converter";
import { pageMetadata } from "@/server/page-metadata";

const SLUG = "gbps-to-mbs";

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
        defaultFrom="gbps"
        defaultTo="mbyteps"
        defaultValue={1}
        presets={[0.5, 1, 2, 2.5, 5, 10]}
        tableValues={[0.1, 0.25, 0.5, 1, 1.5, 2, 2.5, 5, 10]}
        insights
      />
    </ToolPage>
  );
}
