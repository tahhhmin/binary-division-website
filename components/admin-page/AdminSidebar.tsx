import React from "react";
import Link from "next/link";
import Image from "next/image";

import LogoWhite from '@/public/bd-icon-logo-w.svg'

import styles from './AdminSidebar.module.css'

import {
    Sidebar,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Grid,
    Users,
    FileText,
    Terminal,
    Settings,
    LogOut,
    Newspaper,
} from "lucide-react";

const navItems = [
    { id: "dashboard", label: "Dashboard", href: "/admin", icon: Grid },
    { id: "news", label: "News", href: "/admin", icon: Newspaper },
    { id: "projects", label: "Projects", href: "/admin/projects", icon: Terminal, badge: 8 },
  

    { id: "settings", label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
    return (
        <Sidebar>
        <SidebarHeader>
            <div className={styles.sidebarHeader}>
                <Image
                    src={LogoWhite}
                    width={35}
                    height={35}
                    alt="Picture of the author"
                />
                <h4 className={styles.sidebarHeaderTitle}>Binary Division</h4>
            </div>
        </SidebarHeader>

        <SidebarContent>
            <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarMenu>
                {navItems.map((item) => {
                const Icon = item.icon;
                return (
                    <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                        <Link href={item.href} className="flex items-center gap-3">
                        <Icon size={18} />
                        <span>{item.label}</span>
                        {item.badge && (
                            <Badge className="ml-auto" variant="secondary">
                            {item.badge}
                            </Badge>
                        )}
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                );
                })}
            </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
            <div className="flex items-center gap-3 px-4 pb-4">
            <Avatar>
                <AvatarImage src="/avatar.jpg" />
                <AvatarFallback>TT</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <p className="text-sm font-medium">Tajrian Tahmin</p>
                <p className="text-xs text-muted-foreground">Founder & Executive Director</p>
            </div>
            <button className="text-sm flex items-center gap-1 text-muted-foreground hover:text-foreground">
                <LogOut size={16} />
            </button>
            </div>
        </SidebarFooter>
        </Sidebar>
    );
}