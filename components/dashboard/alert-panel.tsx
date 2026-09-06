"use client"

import { ShieldAlert, Clock, ArrowRight } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "critical" as const,
    title: "Early Distress Signal Detected",
    description:
      "Pattern analysis indicates potential emotional distress. Silence duration increased 340% over baseline in the last 2 minutes.",
    time: "Just now",
  },
  {
    id: 2,
    type: "warning" as const,
    title: "Unusual Pause Pattern",
    description:
      "Subject exhibited 8 consecutive pauses exceeding 2.5 seconds. This pattern correlates with hesitation markers.",
    time: "3 min ago",
  },
  {
    id: 3,
    type: "info" as const,
    title: "Voice Energy Baseline Updated",
    description:
      "New baseline established at 52% energy level. Previous baseline was 68%.",
    time: "12 min ago",
  },
]

const alertStyles = {
  critical: {
    border: "border-chart-4/30",
    bg: "bg-chart-4/5",
    iconBg: "bg-chart-4/10",
    iconColor: "text-chart-4",
    badge: "bg-chart-4/15 text-chart-4",
  },
  warning: {
    border: "border-chart-3/30",
    bg: "bg-chart-3/5",
    iconBg: "bg-chart-3/10",
    iconColor: "text-chart-3",
    badge: "bg-chart-3/15 text-chart-3",
  },
  info: {
    border: "border-chart-2/30",
    bg: "bg-chart-2/5",
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
    badge: "bg-chart-2/15 text-chart-2",
  },
}

export function AlertPanel() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Alert Center
        </h2>
        <button className="flex items-center gap-1 text-xs text-primary transition-colors hover:text-primary/80">
          View all <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {alerts.map((alert) => {
          const style = alertStyles[alert.type]
          return (
            <div
              key={alert.id}
              className={`flex gap-3 rounded-xl border ${style.border} ${style.bg} p-4 transition-colors`}
            >
              <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${style.iconBg}`}>
                <ShieldAlert className={`h-4 w-4 ${style.iconColor}`} />
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    {alert.title}
                  </h3>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${style.badge}`}>
                    {alert.type}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {alert.description}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {alert.time}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
