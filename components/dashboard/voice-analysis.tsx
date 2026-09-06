"use client"

import { useEffect, useState } from "react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { Mic } from "lucide-react"

const initialData = [
  { time: "0s", pause: 0.2, energy: 72 },
  { time: "5s", pause: 0.8, energy: 65 },
  { time: "10s", pause: 1.5, energy: 45 },
  { time: "15s", pause: 0.3, energy: 78 },
  { time: "20s", pause: 2.1, energy: 32 },
  { time: "25s", pause: 0.5, energy: 68 },
  { time: "30s", pause: 1.8, energy: 41 },
  { time: "35s", pause: 0.4, energy: 74 },
  { time: "40s", pause: 1.2, energy: 55 },
  { time: "45s", pause: 0.6, energy: 62 },
]

export function VoiceAnalysis() {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newPoint = {
          time: `${parseInt(prev[prev.length - 1].time) + 5}s`,
          pause: Math.random() * 2.5,
          energy: 30 + Math.random() * 50,
        }
        return [...prev.slice(1), newPoint]
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const avgSilence = (
    data.reduce((sum, d) => sum + d.pause, 0) / data.length
  ).toFixed(1)
  const avgEnergy = Math.round(
    data.reduce((sum, d) => sum + d.energy, 0) / data.length
  )

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Live Voice Analysis
        </h2>
        <div className="flex items-center gap-1.5 text-primary">
          <Mic className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">Recording</span>
        </div>
      </div>

      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="pauseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(174, 72%, 52%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(174, 72%, 52%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "hsl(215, 20%, 55%)" }}
              width={30}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220, 20%, 9%)",
                border: "1px solid hsl(220, 16%, 16%)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "hsl(210, 40%, 95%)",
              }}
            />
            <Area
              type="monotone"
              dataKey="pause"
              stroke="hsl(174, 72%, 52%)"
              strokeWidth={2}
              fill="url(#pauseGradient)"
              name="Pause Duration (s)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-secondary/50 px-3 py-2.5 text-center">
          <p className="text-lg font-bold font-mono text-primary">{avgSilence}s</p>
          <p className="text-[10px] text-muted-foreground">Avg Pause</p>
        </div>
        <div className="rounded-xl bg-secondary/50 px-3 py-2.5 text-center">
          <p className="text-lg font-bold font-mono text-foreground">{avgEnergy}%</p>
          <p className="text-[10px] text-muted-foreground">Voice Energy</p>
        </div>
        <div className="rounded-xl bg-secondary/50 px-3 py-2.5 text-center">
          <p className="text-lg font-bold font-mono text-chart-4">23%</p>
          <p className="text-[10px] text-muted-foreground">Silence %</p>
        </div>
      </div>
    </div>
  )
}
