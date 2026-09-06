"use client"

import { Bell, Wifi } from "lucide-react"

export function Header() {
  return (
    <header className="flex flex-col gap-4 border-b border-border bg-card/40 px-6 py-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Silence AI
        </h1>
        <p className="text-sm text-muted-foreground">
          AI that listens beyond words
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-xs font-medium text-primary">Listening Live</span>
        </div>
        <button
          className="relative rounded-lg border border-border bg-secondary/50 p-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-[8px] font-bold text-destructive-foreground">
            2
          </span>
        </button>
        <div className="flex items-center gap-2">
          <Wifi className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground font-mono">ESP32</span>
        </div>
      </div>
    </header>
  )
}
