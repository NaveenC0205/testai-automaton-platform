import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  Bot,
  TestTube,
  Play,
  BarChart3,
  Settings,
  Code,
  Zap,
  Users,
  FileText,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Tests", url: "/tests", icon: TestTube },
  { title: "Executions", url: "/executions", icon: Play },
  { title: "AI Assistant", url: "/ai-chat", icon: Bot, badge: "AI" },
  { title: "Reports", url: "/reports", icon: BarChart3 },
];

const toolsItems = [
  { title: "Code Editor", url: "/editor", icon: Code },
  { title: "Test Generator", url: "/generator", icon: Zap, badge: "Beta" },
  { title: "Team", url: "/team", icon: Users },
  { title: "Documentation", url: "/docs", icon: FileText },
];

const settingsItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClassName = (path: string) => {
    const baseClasses = "w-full justify-start transition-colors";
    return isActive(path)
      ? `${baseClasses} bg-primary text-primary-foreground`
      : `${baseClasses} hover:bg-accent hover:text-accent-foreground`;
  };

  const renderNavItem = (item: typeof navigationItems[0]) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <NavLink to={item.url} className={getNavClassName(item.url)}>
          <item.icon className="h-4 w-4" />
          {!isCollapsed && (
            <>
              <span>{item.title}</span>
              {item.badge && (
                <Badge 
                  variant={item.badge === "AI" ? "default" : "secondary"} 
                  className="ml-auto text-xs"
                >
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar className="border-r bg-sidebar">
      <SidebarContent>
        {/* Logo */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <TestTube className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-semibold text-sm">TestAI Platform</h2>
                <p className="text-xs text-muted-foreground">Automation Suite</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Tools */}
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}