"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,

  SidebarRail,
} from "@/components/ui/sidebar"
import { TerminalSquareIcon, BotIcon, BookOpenIcon, Settings2Icon, FrameIcon, PieChartIcon, MapIcon, BookOpenCheck, Utensils, ClipboardClock } from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Bookings",
      url: "#",
      icon: (
        <BookOpenCheck />
      ),
      isActive: false,
      items: [
        {
          title: "View and manage",
          url: "#",
        },
   
        {
          title: "Create",
          url: "#",
        },
      ],
    },
    {
      title: "Tables",
      url: "#",
      icon: (
          <Utensils />
      ),
      items: [
        {
          title: "View and manage",
          url: "#",
        },
        {
          title: "Create",
          url: "#",
        },
    
      ],
    },
    {
      title: "Availability",
      url: "#",
      icon: (
         <ClipboardClock />
      ),
      items: [
        {
          title: "View schedule",
          url: "#",
        },
        {
          title: "Update time slots",
          url: "#",
        }
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon
        />
      ),
      items: [
        {
          title: "Booking duration",
          url: "#",
        },
        {
          title: "Business hours",
          url: "#",
        },
        {
          title: "Account",
          url: "#",
        }
      ],
    },
  ],
  projects: [
    {
      name: "Available seats: 12",
      url: "#",
      icon: (
        <FrameIcon
        />
      ),
    },
    {
      name: "Capacity: 44/50",
      url: "#",
      icon: (
        <PieChartIcon
        />
      ),
    },
    {
      name: "Next free slot: 12:00",
      url: "#",
      icon: (
        <MapIcon
        />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar  {...props}>
      <SidebarHeader>

      
       <h1 className="text-xl font-medium mt-4">Table<span className="text-primary font-bold">Mate</span></h1>
      
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
