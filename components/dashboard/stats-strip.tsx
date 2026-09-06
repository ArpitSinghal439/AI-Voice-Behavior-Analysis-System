"use client"

import { Timer, AudioWaveform, Brain, Shield } from "lucide-react"

const stats = [
  {
    icon: Timer,
    label: "Session Duration",
    value: "14:32",
    unit: "min",
    color: "text-primary",
  },
  {
    icon: AudioWaveform,
    label: "Words Analyzed",
    value: "1,247",
    unit: "words",
    color: "text-chart-2",
  },
  {
    icon: Brain,
    label: "Patterns Found",
    value: "23",
    unit: "signals",
    color: "text-chart-3",
  },
  {
    icon: Shield,
    label: "Confidence",
    value: "94.2",
    unit: "%",
    color: "text-primary",
  },
]

export function StatsStrip() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-md"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/80">
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-lg font-bold font-mono tabular-nums text-foreground">
              {stat.value}
              <span className="ml-0.5 text-xs font-normal text-muted-foreground">
                {stat.unit}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
