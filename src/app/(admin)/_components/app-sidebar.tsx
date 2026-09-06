"use client";

import {
  BookOpenIcon,
  FileTextIcon,
  ImageIcon,
  LayoutDashboard,
  TerminalIcon,
} from "lucide-react";
import type * as React from "react";
import { NavMain } from "@/app/(admin)/_components/nav-main";
import { NavUser } from "@/app/(admin)/_components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: <LayoutDashboard />,
    },
    {
      title: "Blogs",
      url: "/admin/blogs",
      icon: <BookOpenIcon />,
      items: [
        {
          title: "Add Blog",
          url: "/admin/blogs/new",
        },
      ],
    },
    {
      title: "Page Content",
      url: "/admin/pages",
      icon: <FileTextIcon />,
    },
    {
      title: "Image Upload",
      url: "/admin/media",
      icon: <ImageIcon />,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <TerminalIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">GENZ</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
