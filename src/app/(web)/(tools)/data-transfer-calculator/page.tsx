import { DataTransferCalculator } from "@/components/tools/data-transfer-calculator";
import { ToolPage } from "@/components/tools/tool-page";
import { pageMetadata } from "@/server/page-metadata";

const SLUG = "data-transfer-calculator";

// Statically generated; a save in the dashboard calls revalidatePath, and this
// is the fallback refresh window (2 days).
export const revalidate = 172800;

export async function generateMetadata() {
  return pageMetadata(SLUG);
}

export default function Page() {
  return (
    <ToolPage slug={SLUG}>
      <DataTransferCalculator />
    </ToolPage>
  );
}
