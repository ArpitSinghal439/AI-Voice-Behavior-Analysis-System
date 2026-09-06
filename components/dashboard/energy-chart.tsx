"use client"

import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts"

const initialData = [
  { segment: "S1", energy: 72 },
  { segment: "S2", energy: 65 },
  { segment: "S3", energy: 45 },
  { segment: "S4", energy: 78 },
  { segment: "S5", energy: 32 },
  { segment: "S6", energy: 55 },
  { segment: "S7", energy: 68 },
  { segment: "S8", energy: 41 },
  { segment: "S9", energy: 60 },
  { segment: "S10", energy: 74 },
  { segment: "S11", energy: 38 },
  { segment: "S12", energy: 52 },
]

function getBarColor(energy: number) {
  if (energy >= 60) return "hsl(174, 72%, 52%)"
  if (energy >= 40) return "hsl(45, 93%, 58%)"
  return "hsl(0, 72%, 55%)"
}

export function EnergyChart() {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((item) => ({
          ...item,
          energy: Math.max(20, Math.min(90, item.energy + (Math.random() - 0.5) * 15)),
        }))
      )
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Voice Energy Levels
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-[10px] text-muted-foreground">High</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-chart-3" />
            <span className="text-[10px] text-muted-foreground">Mid</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-chart-4" />
            <span className="text-[10px] text-muted-foreground">Low</span>
          </div>
        </div>
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <XAxis
              dataKey="segment"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "hsl(215, 20%, 55%)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "hsl(215, 20%, 55%)" }}
              domain={[0, 100]}
              width={25}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220, 20%, 9%)",
                border: "1px solid hsl(220, 16%, 16%)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "hsl(210, 40%, 95%)",
              }}
              cursor={{ fill: "hsl(220, 16%, 14%)", radius: 4 }}
            />
            <Bar dataKey="energy" radius={[4, 4, 0, 0]} name="Energy %">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.energy)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
