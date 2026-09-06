import { ToolPage } from "@/components/tools/tool-page";
import { TransferTimeCalculator } from "@/components/tools/transfer-time-calculator";
import { pageMetadata } from "@/server/page-metadata";

const SLUG = "upload-time-calculator";

// Statically generated; a save in the dashboard calls revalidatePath, and this
// is the fallback refresh window (2 days).
export const revalidate = 172800;

export async function generateMetadata() {
  return pageMetadata(SLUG);
}

export default function Page() {
  return (
    <ToolPage slug={SLUG}>
      <TransferTimeCalculator
        mode="upload"
        defaultSizeValue={5}
        defaultSizeUnit="gb"
        defaultSpeedValue={20}
      />
    </ToolPage>
  );
}
