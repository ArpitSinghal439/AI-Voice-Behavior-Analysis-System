"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Activity,
  Clock,
  Cpu,
  ShieldAlert,
  Settings,
  Brain,
  ChevronLeft,
  ChevronRight,
  Bell,
  Wifi,
  Menu,
  X,
  Mic,
  Upload,
  BarChart3,
} from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Activity, label: "Live Analysis", href: "/dashboard/live" },
  { icon: Upload, label: "Voice Upload", href: "/dashboard/upload" },
  { icon: Clock, label: "History", href: "/dashboard/history" },
  { icon: BarChart3, label: "Insights", href: "/dashboard/insights" },
  { icon: Cpu, label: "Devices", href: "/dashboard/devices" },
  { icon: ShieldAlert, label: "Alerts", href: "/dashboard/alerts" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

function DashboardHeader() {
  return (
    <header className="flex flex-col gap-4 border-b border-border bg-card/40 px-6 py-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Silence AI
        </h1>
        <p className="text-sm text-muted-foreground">AI that listens beyond words</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-medium text-primary">Listening Live</span>
        </div>
        <Link
          href="/dashboard/alerts"
          className="relative rounded-lg border border-border bg-secondary/50 p-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-[8px] font-bold text-destructive-foreground">
            3
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Wifi className="h-4 w-4 text-primary" />
          <span className="font-mono text-xs text-muted-foreground">ESP32</span>
        </div>
      </div>
    </header>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="relative min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-border bg-card/60 backdrop-blur-xl transition-all duration-300 lg:flex",
          collapsed ? "w-16" : "w-56"
        )}
      >
        <Link href="/" className="flex items-center gap-2 border-b border-border px-4 py-5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          {!collapsed && (
            <span className="truncate text-sm font-semibold text-foreground">Silence AI</span>
          )}
        </Link>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border p-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </aside>

      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
            role="presentation"
          />
          <aside className="relative z-50 flex h-full w-56 flex-col border-r border-border bg-card/90 backdrop-blur-xl">
            <div className="flex items-center gap-2 border-b border-border px-4 py-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <span className="truncate text-sm font-semibold text-foreground">Silence AI</span>
            </div>
            <nav className="flex flex-1 flex-col gap-1 p-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className={cn("min-h-screen transition-all duration-300", collapsed ? "lg:ml-16" : "lg:ml-56")}>
        {/* Mobile top bar */}
        <div className="flex items-center gap-3 border-b border-border bg-card/40 px-4 py-3 backdrop-blur-md lg:hidden">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="rounded-lg border border-border p-2 text-foreground"
            aria-label="Toggle navigation"
          >
            {mobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <span className="text-sm font-bold text-foreground">Silence AI</span>
          <div className="ml-auto flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-2 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="text-[10px] font-medium text-primary">Live</span>
          </div>
        </div>

        <DashboardHeader />
        {children}
      </main>
    </div>
  )
}
