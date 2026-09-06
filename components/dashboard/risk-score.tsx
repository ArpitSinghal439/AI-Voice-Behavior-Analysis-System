"use client"

import { useEffect, useState } from "react"

export function RiskScore() {
  const [score, setScore] = useState(0)
  const targetScore = 38

  useEffect(() => {
    const timer = setTimeout(() => {
      if (score < targetScore) {
        setScore((prev) => Math.min(prev + 1, targetScore))
      }
    }, 30)
    return () => clearTimeout(timer)
  }, [score, targetScore])

  const riskLevel = score < 30 ? "Low" : score < 60 ? "Medium" : "High"
  const riskColor =
    score < 30
      ? "hsl(174, 72%, 52%)"
      : score < 60
        ? "hsl(45, 93%, 58%)"
        : "hsl(0, 72%, 55%)"

  const circumference = 2 * Math.PI * 70
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Risk Assessment
        </h2>
        <span
          className="rounded-full px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor: `${riskColor}15`,
            color: riskColor,
          }}
        >
          {riskLevel}
        </span>
      </div>

      <div className="relative">
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          className="rotate-[-90deg]"
        >
          <circle
            cx="90"
            cy="90"
            r="70"
            fill="none"
            stroke="hsl(220, 16%, 14%)"
            strokeWidth="10"
          />
          <circle
            cx="90"
            cy="90"
            r="70"
            fill="none"
            stroke={riskColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${riskColor}40)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-4xl font-bold font-mono tabular-nums"
            style={{ color: riskColor }}
          >
            {score}
          </span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>

      <p className="text-center text-xs leading-relaxed text-muted-foreground italic">
        {"\"Same words, different silence — different AI result\""}
      </p>
    </div>
  )
}
