"use client"

import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts"
import {
  Brain,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  Target,
  Zap,
  Shield,
  Clock,
} from "lucide-react"

const weeklyRisk = [
  { week: "W1", risk: 22, energy: 72, pauses: 8 },
  { week: "W2", risk: 28, energy: 65, pauses: 12 },
  { week: "W3", risk: 35, energy: 58, pauses: 18 },
  { week: "W4", risk: 31, energy: 62, pauses: 15 },
  { week: "W5", risk: 42, energy: 51, pauses: 22 },
  { week: "W6", risk: 38, energy: 55, pauses: 19 },
  { week: "W7", risk: 45, energy: 48, pauses: 25 },
  { week: "W8", risk: 36, energy: 58, pauses: 17 },
]

const behaviorCorrelation = [
  { metric: "Silence Duration", correlation: 0.87, direction: "positive" },
  { metric: "Voice Energy Drop", correlation: 0.79, direction: "positive" },
  { metric: "Hesitation Frequency", correlation: 0.72, direction: "positive" },
  { metric: "Speech Speed", correlation: 0.65, direction: "negative" },
  { metric: "Emotional Tone", correlation: 0.58, direction: "negative" },
]

const aiRecommendations = [
  {
    icon: Lightbulb,
    title: "Increase Check-in Frequency",
    description:
      "Risk scores have trended upward 18% over the last 3 weeks. Consider increasing daily check-ins from 1x to 2x.",
    priority: "high" as const,
  },
  {
    icon: Target,
    title: "Focus on Evening Sessions",
    description:
      "Analysis shows 73% of high-risk patterns occur during evening recordings (6PM-10PM). Monitor these windows closely.",
    priority: "medium" as const,
  },
  {
    icon: Zap,
    title: "Pause Pattern Intervention",
    description:
      "Consecutive pauses exceeding 2.5s have increased by 40%. This pattern historically precedes emotional decline by 48-72 hours.",
    priority: "high" as const,
  },
  {
    icon: Shield,
    title: "Baseline Needs Recalibration",
    description:
      "Voice energy baseline has shifted downward. Recommend recalibrating to current 52% energy level for accurate readings.",
    priority: "low" as const,
  },
]

const priorityStyles = {
  high: { bg: "bg-chart-4/5", border: "border-chart-4/20", badge: "bg-chart-4/15 text-chart-4" },
  medium: { bg: "bg-chart-3/5", border: "border-chart-3/20", badge: "bg-chart-3/15 text-chart-3" },
  low: { bg: "bg-chart-2/5", border: "border-chart-2/20", badge: "bg-chart-2/15 text-chart-2" },
}

const tooltipStyle = {
  backgroundColor: "hsl(220, 20%, 9%)",
  border: "1px solid hsl(220, 16%, 16%)",
  borderRadius: "8px",
  fontSize: "12px",
  color: "hsl(210, 40%, 95%)",
}

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-foreground">AI Insights</h2>
        <p className="text-sm text-muted-foreground">
          Behavioral pattern analysis and AI-generated recommendations.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Avg Risk Score", value: "34.6", change: "+12%", up: true, color: "text-chart-3" },
          { label: "Avg Voice Energy", value: "58%", change: "-8%", up: false, color: "text-chart-4" },
          { label: "Total Sessions", value: "47", change: "+5", up: true, color: "text-primary" },
          { label: "Patterns Found", value: "156", change: "+23", up: true, color: "text-chart-2" },
        ].map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col gap-2 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-md"
          >
            <p className="text-xs text-muted-foreground">{metric.label}</p>
            <div className="flex items-end gap-2">
              <span className="font-mono text-2xl font-bold text-foreground">{metric.value}</span>
              <span className={`flex items-center text-xs font-medium ${metric.color}`}>
                {metric.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Risk + Energy Trend */}
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md lg:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Risk vs. Voice Energy Trend
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyRisk}>
                <defs>
                  <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(174, 72%, 52%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(174, 72%, 52%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 14%)" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }} domain={[0, 100]} width={30} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="risk" stroke="hsl(0, 72%, 55%)" strokeWidth={2} fill="url(#riskGrad)" name="Risk Score" />
                <Area type="monotone" dataKey="energy" stroke="hsl(174, 72%, 52%)" strokeWidth={2} fill="url(#energyGrad)" name="Voice Energy" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-chart-4" />
              <span className="text-xs text-muted-foreground">Risk Score</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Voice Energy</span>
            </div>
          </div>
        </div>

        {/* Behavior Correlations */}
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Distress Correlations
          </h3>
          <div className="flex flex-col gap-3">
            {behaviorCorrelation.map((item) => (
              <div key={item.metric} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground">{item.metric}</span>
                  <div className="flex items-center gap-1">
                    {item.direction === "positive" ? (
                      <TrendingUp className="h-3 w-3 text-chart-4" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-primary" />
                    )}
                    <span className="font-mono text-xs font-bold text-foreground">
                      {item.correlation.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.correlation * 100}%`,
                      backgroundColor:
                        item.correlation > 0.75
                          ? "hsl(0, 72%, 55%)"
                          : item.correlation > 0.6
                            ? "hsl(45, 93%, 58%)"
                            : "hsl(174, 72%, 52%)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            AI Recommendations
          </h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {aiRecommendations.map((rec) => {
            const style = priorityStyles[rec.priority]
            return (
              <div
                key={rec.title}
                className={`flex gap-3 rounded-xl border ${style.border} ${style.bg} p-4`}
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/50">
                  <rec.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-semibold text-foreground">{rec.title}</h4>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${style.badge}`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{rec.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
