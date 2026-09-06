"use client"

import { useEffect, useState } from "react"
import {
  Cpu,
  Mic,
  Radio,
  Thermometer,
  Wifi,
  WifiOff,
  Battery,
  Signal,
  HeartPulse,
  Clock,
  RefreshCw,
} from "lucide-react"

export default function DevicesPage() {
  const [dataRate, setDataRate] = useState(124)
  const [temp, setTemp] = useState(42.3)
  const [silenceDuration, setSilenceDuration] = useState(0)
  const [isConnected] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setDataRate(100 + Math.floor(Math.random() * 60))
      setTemp(40 + Math.random() * 5)
      setSilenceDuration((prev) => {
        if (Math.random() > 0.7) return 0
        return prev + 0.1
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-foreground">Hardware Devices</h2>
        <p className="text-sm text-muted-foreground">
          Hardware-based listening device connected for real-time silence analysis.
        </p>
      </div>

      {/* Device Status Card */}
      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">ESP32-S3 DevKit</h3>
              <p className="font-mono text-xs text-muted-foreground">Firmware v2.4.1</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
              <RefreshCw className="h-3 w-3" />
              Sync
            </button>
            <span
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                isConnected
                  ? "border-primary/30 bg-primary/5 text-primary"
                  : "border-destructive/30 bg-destructive/5 text-destructive"
              }`}
            >
              {isConnected ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
              {isConnected ? "Connected" : "Offline"}
            </span>
          </div>
        </div>

        {/* Hardware Metrics Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3 rounded-xl bg-secondary/50 p-5">
            <div className="flex items-center gap-2">
              <Mic className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Microphone</span>
            </div>
            <p className="text-base font-semibold text-foreground">INMP441</p>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-background">
                <div className="h-full w-3/4 rounded-full bg-primary transition-all" />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">I2S Digital</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-[10px] font-medium text-primary">Active Input</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-xl bg-secondary/50 p-5">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-chart-4" />
              <span className="text-xs text-muted-foreground">Heart Rate (Optional)</span>
            </div>
            <p className="text-base font-semibold text-foreground">MAX30102</p>
            <p className="font-mono text-2xl font-bold text-chart-4">
              72 <span className="text-sm text-muted-foreground">bpm</span>
            </p>
            <span className="text-[10px] text-muted-foreground">SpO2 sensor ready</span>
          </div>

          <div className="flex flex-col gap-3 rounded-xl bg-secondary/50 p-5">
            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-chart-2" />
              <span className="text-xs text-muted-foreground">Data Rate</span>
            </div>
            <p className="font-mono text-2xl font-bold tabular-nums text-foreground">
              {dataRate} <span className="text-sm text-muted-foreground">kb/s</span>
            </p>
            <div className="flex items-center gap-2">
              <Signal className="h-3 w-3 text-primary" />
              <span className="text-[10px] text-muted-foreground">Real-time stream active</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-xl bg-secondary/50 p-5">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-chart-3" />
              <span className="text-xs text-muted-foreground">Temperature</span>
            </div>
            <p className="font-mono text-2xl font-bold tabular-nums text-foreground">
              {temp.toFixed(1)} <span className="text-sm text-muted-foreground">C</span>
            </p>
            <span className="text-[10px] text-primary">Normal range</span>
          </div>
        </div>
      </div>

      {/* Real-time Silence Duration */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-md">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Real-Time Silence Duration
          </h3>
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-4 border-secondary bg-background">
            <div
              className="absolute inset-2 rounded-full transition-all duration-500"
              style={{
                background: `conic-gradient(${
                  silenceDuration > 3 ? "hsl(0, 72%, 55%)" : silenceDuration > 1.5 ? "hsl(45, 93%, 58%)" : "hsl(174, 72%, 52%)"
                } ${Math.min(silenceDuration / 5, 1) * 360}deg, hsl(220, 16%, 14%) 0deg)`,
                opacity: 0.3,
              }}
            />
            <div className="relative z-10 flex flex-col items-center">
              <span
                className="font-mono text-4xl font-bold tabular-nums"
                style={{
                  color:
                    silenceDuration > 3
                      ? "hsl(0, 72%, 55%)"
                      : silenceDuration > 1.5
                        ? "hsl(45, 93%, 58%)"
                        : "hsl(174, 72%, 52%)",
                }}
              >
                {silenceDuration.toFixed(1)}
              </span>
              <span className="text-xs text-muted-foreground">seconds</span>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Current pause duration being tracked by ESP32 microphone input.
          </p>
        </div>

        {/* Device Info */}
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Device Information
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { label: "Device ID", value: "ESP32-S3-001A" },
              { label: "MAC Address", value: "A4:CF:12:E8:3B:7F" },
              { label: "Connection", value: "Wi-Fi 2.4 GHz" },
              { label: "Protocol", value: "WebSocket (WSS)" },
              { label: "Sample Rate", value: "16000 Hz" },
              { label: "Bit Depth", value: "16-bit PCM" },
              { label: "Uptime", value: "4h 23m 12s" },
              { label: "Last Calibration", value: "Feb 12, 2026" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-lg bg-secondary/30 px-4 py-3"
              >
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <span className="font-mono text-xs font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <Battery className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Battery Status</p>
              <p className="text-xs text-muted-foreground">USB Powered - No battery drain</p>
            </div>
            <span className="font-mono text-sm font-bold text-primary">100%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
