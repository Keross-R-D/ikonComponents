"use client";

import * as React from "react";
import { Bot, Eye, Settings, SquarePenIcon, UserRoundCog } from "lucide-react";

import { NavMain } from "./nav-main";

  
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail, 
} from "../shadcn/ui/sidebar";


const data = {
  user: {
    name: "CRM Manager",
    email: "crm@manager.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Leads",
      url: "/leads",
      icon: Bot,
      default: true,
    },
    {
      title: "Deals",
      url: "/deals",
      icon: SquarePenIcon,
      isActive: true,
    },
     {
      title: "Accounts",
      url: "#",
      icon: UserRoundCog,
      isActive: true,
      items: [
        {
          title: "Details",
          url: "/account/details",
        },
        {
          title: "License",
          url: "/account/license",
        },
        {
          title: "Summary",
          url: "/account/summary",
        },
       
      ],
    },
    {
      title: "Configuration",
      url: "#",
      icon: Settings,
      isActive: true,
      items: [
        {
          title: "Employee Details",
          url: "/configuration/employee-data",
        },
        {
          title: "Office Details",
          url: "/configuration/office-details",
        },
        {
          title: "FX Rate",
          url: "/configuration/fx-rate",
        },
        {
          title: "Company Data",
          url: "/configuration/company-data",
        },
        {
          title: "Dynamic Products",
          url: "/configuration/dynamic-products",
        },
      ],
    },
    {
      title: "Summary",
      url: "/summary",
      icon: Eye,
      isActive: true,
    },
   
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-3 h-12 border-b">Sales CRM</SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
