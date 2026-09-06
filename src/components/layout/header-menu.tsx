"use client";

import { ChevronDown, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
export type NavGroup = {
  id: string;
  label: string;
  items: { slug: string; name: string }[];
};

type HeaderMenuProps = {
  groups: NavGroup[];
  links: readonly { label: string; href: string }[];
};

const navLink =
  "relative py-1 text-sm font-medium text-slate-600 transition-colors hover:text-blue-700";

export function HeaderMenu({ groups, links }: HeaderMenuProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <Sheet>
        <SheetTrigger
          aria-label="Open menu"
          className="items-center justify-center rounded p-1.5 text-blue-700 transition-colors hover:bg-blue-50 max-lg:flex hidden"
        >
          <MenuIcon aria-hidden className="size-5" />
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
        >
          <div className="no-scrollbar overflow-y-auto px-4 py-5 grid gap-4">
            {groups.map((group) => (
              <div key={group.id}>
                <h2 className="mb-1.5 text-[11px] font-semibold tracking-[0.08em] text-blue-700 uppercase">
                  {group.label}
                </h2>
                <ul className="grid grid-cols-1">
                  {group.items.map((item) => (
                    <li key={item.slug}>
                      <SheetClose
                        render={
                          <Link
                            href={`/${item.slug}`}
                            className="block rounded px-2 -mx-2 py-1.5 text-sm text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                          />
                        }
                      >
                        {item.name}
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
        <Popover>
          <PopoverTrigger
            render={
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md py-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
              >
                Our Other Fancy TOOLS
                <ChevronDown
                  aria-hidden
                  className={cn("size-4 transition-transform")}
                />
              </button>
            }
          />
          <PopoverContent align="end">
            <ScrollArea className="h-100">
              <div className="flex flex-col gap-3 p-2">
                {groups.map((group) => (
                  <div key={group.id}>
                    <h2 className="mb-2 text-[11px] font-semibold tracking-[0.08em] text-blue-700 uppercase">
                      {group.label}
                    </h2>
                    <ul className="space-y-0.5">
                      {group.items.map((item) => (
                        <li key={item.slug}>
                          <Link
                            href={`/${item.slug}`}
                            className="-mx-2 block rounded border-y border-transparent px-2 py-1 text-sm text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={cn(navLink, isActive(link.href) && "text-blue-700")}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
