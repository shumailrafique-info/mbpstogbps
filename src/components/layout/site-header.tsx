import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/navigation";
import { HeaderMenu, type NavGroup } from "./header-menu";

const HEADER_LINKS = [
  { label: "About", href: "/about-us" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-us" },
];

export function SiteHeader() {
  const groups: NavGroup[] = CATEGORIES.map((category) => ({
    id: category.id,
    label: category.label,
    items: category.items.map((item) => ({ slug: item.slug, name: item.name })),
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-blue-100 bg-[#EFF6FF] backdrop-blur-sm">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-1">
        <Link
          href="/"
          className="group flex shrink-0  items-center gap-2.5 text-[15px] font-semibold tracking-tight text-blue-950"
        >
          <Image
            src={"/logo.png"}
            alt="logo.png"
            width={650}
            height={200}
            className="max-w-50"
          />
        </Link>

        <HeaderMenu groups={groups} links={HEADER_LINKS} />
      </div>
    </header>
  );
}
