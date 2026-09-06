"use client"

import { AlertTriangle, TrendingDown, PauseCircle, HeartPulse } from "lucide-react"

const signals = [
  {
    icon: PauseCircle,
    label: "Incomplete Sentences",
    value: "4 detected",
    severity: "warning" as const,
    description: "Sentences trailed off mid-thought",
  },
  {
    icon: TrendingDown,
    label: "Low Voice Energy",
    value: "Below threshold",
    severity: "danger" as const,
    description: "Energy dropped below 35% baseline",
  },
  {
    icon: AlertTriangle,
    label: "Hesitation Count",
    value: "12 pauses",
    severity: "warning" as const,
    description: "Unusual pause frequency in 60s window",
  },
  {
    icon: HeartPulse,
    label: "Emotional Trend",
    value: "Declining",
    severity: "danger" as const,
    description: "Downward trajectory over last 5 min",
  },
]

const severityStyles = {
  warning: {
    bg: "bg-chart-3/10",
    text: "text-chart-3",
    border: "border-chart-3/20",
    dot: "bg-chart-3",
  },
  danger: {
    bg: "bg-chart-4/10",
    text: "text-chart-4",
    border: "border-chart-4/20",
    dot: "bg-chart-4",
  },
}

export function BehaviorSignals() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Behavior Signals
      </h2>
      <div className="flex flex-col gap-3">
        {signals.map((signal) => {
          const style = severityStyles[signal.severity]
          return (
            <div
              key={signal.label}
              className={`flex items-start gap-3 rounded-xl border ${style.border} ${style.bg} p-3 transition-colors`}
            >
              <div className={`mt-0.5 rounded-lg ${style.bg} p-1.5`}>
                <signal.icon className={`h-4 w-4 ${style.text}`} />
              </div>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {signal.label}
                  </span>
                  <span className={`text-xs font-bold font-mono ${style.text}`}>
                    {signal.value}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {signal.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
