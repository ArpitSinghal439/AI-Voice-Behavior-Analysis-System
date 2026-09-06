"use client"

import { useState } from "react"
import {
  ShieldAlert,
  Clock,
  AlertTriangle,
  Info,
  XCircle,
  Brain,
  CheckCircle,
  Filter,
} from "lucide-react"

const allAlerts = [
  {
    id: 1,
    type: "critical" as const,
    title: "Early Distress Signal Detected",
    description:
      "Pattern analysis indicates potential emotional distress. Silence duration increased 340% over baseline in the last 2 minutes.",
    time: "Just now",
    timestamp: "Feb 12, 2:34 PM",
    recommendation: "Initiate a gentle check-in conversation. Avoid direct confrontation.",
    acknowledged: false,
  },
  {
    id: 2,
    type: "critical" as const,
    title: "High Hesitation Pattern",
    description:
      "12 consecutive pauses exceeding 2.5 seconds detected within a 60-second window. This exceeds critical threshold by 200%.",
    time: "5 min ago",
    timestamp: "Feb 12, 2:29 PM",
    recommendation: "Suggest check-in conversation. Pattern indicates suppressed emotional state.",
    acknowledged: false,
  },
  {
    id: 3,
    type: "warning" as const,
    title: "Voice Energy Below Threshold",
    description:
      "Voice energy has dropped to 32%, well below the 52% established baseline. Sustained low energy for over 3 minutes.",
    time: "12 min ago",
    timestamp: "Feb 12, 2:22 PM",
    recommendation: "Monitor for next 30 minutes. If energy remains low, escalate to medium priority.",
    acknowledged: true,
  },
  {
    id: 4,
    type: "warning" as const,
    title: "Unusual Pause Pattern",
    description:
      "Subject exhibited 8 consecutive pauses exceeding 2.5 seconds. This pattern correlates with hesitation markers.",
    time: "28 min ago",
    timestamp: "Feb 12, 2:06 PM",
    recommendation: "Log pattern for trend analysis. Compare with baseline session data.",
    acknowledged: true,
  },
  {
    id: 5,
    type: "info" as const,
    title: "Voice Energy Baseline Updated",
    description:
      "New baseline established at 52% energy level. Previous baseline was 68%. Auto-recalibrated based on 7-day average.",
    time: "1 hour ago",
    timestamp: "Feb 12, 1:34 PM",
    recommendation: "Review new baseline in Settings > Sensitivity to ensure accuracy.",
    acknowledged: true,
  },
  {
    id: 6,
    type: "info" as const,
    title: "Session Completed Successfully",
    description:
      "14-minute session completed. 23 behavior patterns identified. Risk score: 38/100 (Medium).",
    time: "2 hours ago",
    timestamp: "Feb 12, 12:34 PM",
    recommendation: "Session data saved. View full analysis in History & Analytics.",
    acknowledged: true,
  },
  {
    id: 7,
    type: "warning" as const,
    title: "Emotional Decline Pattern",
    description:
      "Emotional trend has declined 18% over the past 3 sessions. This indicates a sustained downward trajectory.",
    time: "5 hours ago",
    timestamp: "Feb 12, 9:34 AM",
    recommendation: "Consider increasing session frequency from 1x to 2x daily.",
    acknowledged: true,
  },
  {
    id: 8,
    type: "critical" as const,
    title: "Prolonged Silence Event",
    description:
      "8.2-second continuous silence detected during active session. This is the longest silence event recorded in the past 30 days.",
    time: "Yesterday",
    timestamp: "Feb 11, 4:15 PM",
    recommendation: "Review session recording. Cross-reference with mood journal entry for context.",
    acknowledged: true,
  },
]

const alertStyles = {
  critical: {
    border: "border-chart-4/30",
    bg: "bg-chart-4/5",
    iconBg: "bg-chart-4/10",
    iconColor: "text-chart-4",
    badge: "bg-chart-4/15 text-chart-4",
    Icon: XCircle,
  },
  warning: {
    border: "border-chart-3/30",
    bg: "bg-chart-3/5",
    iconBg: "bg-chart-3/10",
    iconColor: "text-chart-3",
    badge: "bg-chart-3/15 text-chart-3",
    Icon: AlertTriangle,
  },
  info: {
    border: "border-chart-2/30",
    bg: "bg-chart-2/5",
    iconBg: "bg-chart-2/10",
    iconColor: "text-chart-2",
    badge: "bg-chart-2/15 text-chart-2",
    Icon: Info,
  },
}

type FilterType = "all" | "critical" | "warning" | "info"

export default function AlertsPage() {
  const [filter, setFilter] = useState<FilterType>("all")
  const [alerts, setAlerts] = useState(allAlerts)

  const filtered = filter === "all" ? alerts : alerts.filter((a) => a.type === filter)

  const counts = {
    critical: alerts.filter((a) => a.type === "critical").length,
    warning: alerts.filter((a) => a.type === "warning").length,
    info: alerts.filter((a) => a.type === "info").length,
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-foreground">Alert Center</h2>
        <p className="text-sm text-muted-foreground">
          Early distress warnings and AI-generated recommendations.
        </p>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex items-center gap-3 rounded-2xl border border-chart-4/20 bg-chart-4/5 p-4">
          <XCircle className="h-5 w-5 text-chart-4" />
          <div>
            <p className="text-xs text-muted-foreground">Critical</p>
            <p className="font-mono text-xl font-bold text-chart-4">{counts.critical}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-chart-3/20 bg-chart-3/5 p-4">
          <AlertTriangle className="h-5 w-5 text-chart-3" />
          <div>
            <p className="text-xs text-muted-foreground">Warning</p>
            <p className="font-mono text-xl font-bold text-chart-3">{counts.warning}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-chart-2/20 bg-chart-2/5 p-4">
          <Info className="h-5 w-5 text-chart-2" />
          <div>
            <p className="text-xs text-muted-foreground">Info</p>
            <p className="font-mono text-xl font-bold text-chart-2">{counts.info}</p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {(["all", "critical", "warning", "info"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              filter === f
                ? "bg-primary/10 text-primary"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Alert Timeline */}
      <div className="flex flex-col gap-4">
        {filtered.map((alert) => {
          const style = alertStyles[alert.type]
          return (
            <div
              key={alert.id}
              className={`flex flex-col gap-4 rounded-2xl border ${style.border} ${style.bg} p-5 transition-all`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.iconBg}`}>
                  <style.Icon className={`h-4 w-4 ${style.iconColor}`} />
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{alert.title}</h3>
                    <div className="flex items-center gap-2">
                      {alert.acknowledged && (
                        <CheckCircle className="h-3.5 w-3.5 text-primary" />
                      )}
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${style.badge}`}>
                        {alert.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{alert.description}</p>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {alert.timestamp} ({alert.time})
                  </div>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="ml-12 rounded-xl border border-primary/15 bg-primary/5 p-3">
                <div className="flex items-center gap-1.5">
                  <Brain className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    AI Recommendation
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {alert.recommendation}
                </p>
              </div>

              {!alert.acknowledged && (
                <div className="ml-12 flex gap-2">
                  <button
                    onClick={() =>
                      setAlerts((prev) =>
                        prev.map((a) => (a.id === alert.id ? { ...a, acknowledged: true } : a))
                      )
                    }
                    className="rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Acknowledge
                  </button>
                  <button className="rounded-lg border border-border bg-secondary/50 px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
