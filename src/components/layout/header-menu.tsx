"use client";

import { ChevronDownIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  description: string;
  items: { path: string; name: string; badge: string }[];
};

type HeaderMenuProps = {
  groups: NavGroup[];
  links: readonly { label: string; href: string }[];
};

const NAV_LINK =
  "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";

export function HeaderMenu({ groups, links }: HeaderMenuProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
        {groups.map((group) => (
          <Popover key={group.id}>
            <PopoverTrigger
              render={
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground"
                >
                  {group.label}
                  <ChevronDownIcon aria-hidden className="size-3.5" />
                </button>
              }
            />
            <PopoverContent align="start" className="p-2">
              <p className="px-2 pt-1 pb-1 text-xs text-muted-foreground">
                {group.description}
              </p>
              <ul className="grid gap-0.5">
                {group.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className="flex items-start flex-col gap-1 rounded-md px-2 py-1 transition-colors hover:bg-accent"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {item.name}
                      </span>
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                        {item.badge}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        ))}

        <span aria-hidden className="mx-2 h-4 w-px bg-border" />

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? "page" : undefined}
            className={cn(
              NAV_LINK,
              "px-3 py-2",
              isActive(link.href) && "text-foreground",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Sheet>
        <SheetTrigger
          aria-label="Open menu"
          className="hidden items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground max-lg:flex"
        >
          <MenuIcon aria-hidden className="size-5" />
        </SheetTrigger>
        <SheetContent side="right">
          <div className="no-scrollbar grid gap-6 overflow-y-auto px-4 py-6">
            {groups.map((group) => (
              <div key={group.id}>
                <h2 className="mb-2 font-mono text-[11px] font-semibold tracking-[0.12em] text-primary uppercase">
                  {group.label}
                </h2>
                <ul className="grid">
                  {group.items.map((item) => (
                    <li key={item.path}>
                      <SheetClose
                        render={
                          <Link
                            href={item.path}
                            className="-mx-2 block rounded-md px-2 py-2 text-sm text-foreground transition-colors hover:bg-accent"
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

            <div className="border-t border-border pt-4">
              <ul className="grid">
                {links.map((link) => (
                  <li key={link.href}>
                    <SheetClose
                      render={
                        <Link
                          href={link.href}
                          className="-mx-2 block rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        />
                      }
                    >
                      {link.label}
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
