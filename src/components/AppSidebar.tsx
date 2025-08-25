import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Megaphone, Users, UserCheck, MessageSquare, Brain, BarChart3, FolderOpen, Settings, Search, Command } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import bloomyLogo from "/lovable-uploads/6811ecb8-08ed-4c9d-82e8-4d5633eb3a1f.png";
const navigationItems = [{
  title: "Dashboard",
  url: "/",
  icon: LayoutDashboard
}, {
    title: "Warmup",
    url: "/warmup",
  icon: Megaphone
}, {
  title: "Accounts",
  url: "/accounts",
  icon: Users
}, {
  title: "Leads",
  url: "/leads",
  icon: UserCheck
}, {
  title: "Messages",
  url: "/messages",
  icon: MessageSquare
}, {
  title: "AI Studio",
  url: "/ai-studio",
  icon: Brain
}, {
  title: "Analytics",
  url: "/analytics",
  icon: BarChart3
}, {
  title: "Content",
  url: "/content",
  icon: FolderOpen
}, {
  title: "Settings",
  url: "/settings",
  icon: Settings
}];
export function AppSidebar() {
  const {
    state
  } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };
  return <Sidebar className="border-r border-border bg-card">
      <SidebarHeader className="py-0 px-1 border-b border-border">
        <div className="flex justify-center items-center">
          <img src={bloomyLogo} alt="Bloomy" className={`transition-all ${collapsed ? "h-48 w-48" : "h-48 w-auto"}`} />
        </div>
      </SidebarHeader>

      {!collapsed && <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search... (⌘K)" className="pl-10 bg-muted/50 border-border" />
          </div>
        </div>}

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={({
                  isActive: active
                }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${active || isActive(item.url) ? "bg-primary text-primary-foreground shadow-glow" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && <div className="mt-auto p-4 border-t border-border">
            <Button variant="outline" size="sm" className="w-full gap-2 text-muted-foreground hover:text-foreground">
              <Command className="h-4 w-4" />
              Quick Actions
            </Button>
          </div>}
      </SidebarContent>
    </Sidebar>;
}