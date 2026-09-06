"use client"

import { useEffect, useState, useRef } from "react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { Mic, Brain, Radio, Volume2, Clock, AlertTriangle } from "lucide-react"

function LiveWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const bars: number[] = Array.from({ length: 80 }, () => Math.random() * 0.5)

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerY = canvas.height / 2
      const barWidth = canvas.width / bars.length
      const gap = 2

      for (let i = 0; i < bars.length; i++) {
        bars[i] += (Math.random() - 0.5) * 0.15
        bars[i] = Math.max(0.05, Math.min(1, bars[i]))

        const barHeight = bars[i] * (canvas.height * 0.8)

        const gradient = ctx.createLinearGradient(0, centerY - barHeight / 2, 0, centerY + barHeight / 2)
        gradient.addColorStop(0, "hsla(174, 72%, 52%, 0.8)")
        gradient.addColorStop(0.5, "hsla(174, 72%, 52%, 1)")
        gradient.addColorStop(1, "hsla(174, 72%, 52%, 0.8)")

        ctx.fillStyle = gradient
        ctx.fillRect(
          i * barWidth + gap / 2,
          centerY - barHeight / 2,
          barWidth - gap,
          barHeight
        )
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={200}
      className="h-48 w-full rounded-xl"
    />
  )
}

const initialPauseData = Array.from({ length: 20 }, (_, i) => ({
  time: `${i * 3}s`,
  duration: Math.random() * 3,
}))

const aiStates = ["Listening", "Processing", "Risk Calculated"] as const

export default function LiveAnalysisPage() {
  const [pauseData, setPauseData] = useState(initialPauseData)
  const [silencePercent, setSilencePercent] = useState(23)
  const [energyLevel, setEnergyLevel] = useState(62)
  const [aiStatus, setAiStatus] = useState<(typeof aiStates)[number]>("Listening")
  const [riskScore, setRiskScore] = useState(38)

  useEffect(() => {
    const interval = setInterval(() => {
      setPauseData((prev) => {
        const next = {
          time: `${parseInt(prev[prev.length - 1].time) + 3}s`,
          duration: Math.random() * 3.5,
        }
        return [...prev.slice(1), next]
      })
      setSilencePercent(15 + Math.floor(Math.random() * 25))
      setEnergyLevel(35 + Math.floor(Math.random() * 45))
    }, 2500)

    const statusInterval = setInterval(() => {
      setAiStatus((prev) => {
        const idx = aiStates.indexOf(prev)
        return aiStates[(idx + 1) % aiStates.length]
      })
    }, 4000)

    const riskInterval = setInterval(() => {
      setRiskScore((prev) => Math.max(10, Math.min(90, prev + Math.floor((Math.random() - 0.5) * 8))))
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(statusInterval)
      clearInterval(riskInterval)
    }
  }, [])

  const aiStatusColor =
    aiStatus === "Listening"
      ? "text-primary"
      : aiStatus === "Processing"
        ? "text-chart-3"
        : "text-chart-2"

  const riskColor =
    riskScore < 30
      ? "hsl(174, 72%, 52%)"
      : riskScore < 60
        ? "hsl(45, 93%, 58%)"
        : "hsl(0, 72%, 55%)"

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Top Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-md">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Volume2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Voice Energy</p>
            <p className="font-mono text-lg font-bold tabular-nums text-foreground">{energyLevel}%</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-md">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-chart-3/10">
            <Clock className="h-5 w-5 text-chart-3" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Silence %</p>
            <p className="font-mono text-lg font-bold tabular-nums text-foreground">{silencePercent}%</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-md">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-chart-2/10">
            <Brain className={`h-5 w-5 ${aiStatusColor}`} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">AI Status</p>
            <p className={`text-sm font-semibold ${aiStatusColor}`}>{aiStatus}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-md">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
            <Radio className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Stream</p>
            <p className="text-sm font-semibold text-primary">Active</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Center: Waveform Panel */}
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mic className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Live Microphone Waveform
              </h2>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Recording
            </span>
          </div>
          <LiveWaveform />

          {/* Pause Duration Graph */}
          <div className="mt-2">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pause Duration Over Time
            </h3>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pauseData}>
                  <defs>
                    <linearGradient id="livePauseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 9, fill: "hsl(215, 20%, 55%)" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 9, fill: "hsl(215, 20%, 55%)" }}
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
                  />
                  <Area
                    type="monotone"
                    dataKey="duration"
                    stroke="hsl(199, 89%, 48%)"
                    strokeWidth={2}
                    fill="url(#livePauseGradient)"
                    name="Pause (s)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right: AI Insights Panel */}
        <div className="flex flex-col gap-6">
          {/* Floating Risk Score */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Live Risk Score
            </h2>
            <div className="relative">
              <svg width="140" height="140" viewBox="0 0 140 140" className="rotate-[-90deg]">
                <circle cx="70" cy="70" r="55" fill="none" stroke="hsl(220, 16%, 14%)" strokeWidth="8" />
                <circle
                  cx="70"
                  cy="70"
                  r="55"
                  fill="none"
                  stroke={riskColor}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 55}
                  strokeDashoffset={2 * Math.PI * 55 - (riskScore / 100) * 2 * Math.PI * 55}
                  className="transition-all duration-500 ease-out"
                  style={{ filter: `drop-shadow(0 0 6px ${riskColor}40)` }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-3xl font-bold tabular-nums" style={{ color: riskColor }}>
                  {riskScore}
                </span>
                <span className="text-[10px] text-muted-foreground">/ 100</span>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              AI Insights
            </h2>
            <div className="flex flex-col gap-3">
              <div className="rounded-xl border border-chart-3/20 bg-chart-3/5 p-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-chart-3" />
                  <span className="text-xs font-semibold text-foreground">Hesitation Detected</span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  3 consecutive pauses exceeding 2s threshold in the last 30 seconds.
                </p>
              </div>
              <div className="rounded-xl border border-chart-2/20 bg-chart-2/5 p-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-3.5 w-3.5 text-chart-2" />
                  <span className="text-xs font-semibold text-foreground">Pattern Match</span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  Speech cadence matches prior distress session from 3 days ago.
                </p>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold text-foreground">Energy Baseline</span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  Voice energy is 18% below established baseline for this time of day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
