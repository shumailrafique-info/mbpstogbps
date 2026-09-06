import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function WebLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="max-w-6xl mx-auto flex-1 px-4 py-4 w-full">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
