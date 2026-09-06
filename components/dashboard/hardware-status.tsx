"use client"

import { useEffect, useState } from "react"
import { Cpu, Mic, Radio, Thermometer } from "lucide-react"

export function HardwareStatus() {
  const [dataRate, setDataRate] = useState(124)

  useEffect(() => {
    const interval = setInterval(() => {
      setDataRate(100 + Math.floor(Math.random() * 60))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Hardware Integration
        </h2>
        <span className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Connected
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2 rounded-xl bg-secondary/50 p-4">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Device</span>
          </div>
          <p className="text-sm font-semibold text-foreground">ESP32-S3</p>
          <p className="text-[10px] text-muted-foreground font-mono">v2.4.1 firmware</p>
        </div>

        <div className="flex flex-col gap-2 rounded-xl bg-secondary/50 p-4">
          <div className="flex items-center gap-2">
            <Mic className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Microphone</span>
          </div>
          <p className="text-sm font-semibold text-foreground">INMP441</p>
          <p className="text-[10px] text-muted-foreground font-mono">I2S Digital</p>
        </div>

        <div className="flex flex-col gap-2 rounded-xl bg-secondary/50 p-4">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-chart-2" />
            <span className="text-xs text-muted-foreground">Data Rate</span>
          </div>
          <p className="text-sm font-semibold text-foreground font-mono tabular-nums">
            {dataRate} <span className="text-xs text-muted-foreground font-normal">kb/s</span>
          </p>
          <p className="text-[10px] text-muted-foreground">Real-time stream</p>
        </div>

        <div className="flex flex-col gap-2 rounded-xl bg-secondary/50 p-4">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-chart-3" />
            <span className="text-xs text-muted-foreground">Temp</span>
          </div>
          <p className="text-sm font-semibold text-foreground font-mono">42.3 <span className="text-xs text-muted-foreground font-normal">C</span></p>
          <p className="text-[10px] text-muted-foreground">Normal range</p>
        </div>
      </div>
    </div>
  )
}
