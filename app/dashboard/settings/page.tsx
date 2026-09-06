"use client"

import { useState } from "react"
import {
  Sun,
  Moon,
  Bell,
  BellOff,
  Cpu,
  RefreshCw,
  Shield,
  Volume2,
  Sliders,
  CheckCircle,
  Loader2,
} from "lucide-react"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [criticalAlerts, setCriticalAlerts] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(false)
  const [sensitivity, setSensitivity] = useState(65)
  const [pauseThreshold, setPauseThreshold] = useState(2.5)
  const [syncing, setSyncing] = useState(false)
  const [saved, setSaved] = useState(false)

  function handleSync() {
    setSyncing(true)
    setTimeout(() => setSyncing(false), 2000)
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">Configure your Silence AI experience.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Appearance */}
        <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-chart-3" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Appearance
            </h3>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-secondary/30 p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Optimized for low-light environments</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                darkMode ? "bg-primary" : "bg-secondary"
              }`}
              aria-label="Toggle dark mode"
            >
              <span
                className={`absolute top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-background transition-all ${
                  darkMode ? "left-[22px]" : "left-0.5"
                }`}
              >
                {darkMode ? <Moon className="h-3 w-3 text-primary" /> : <Sun className="h-3 w-3 text-chart-3" />}
              </span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-chart-2" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Notifications
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                label: "Push Notifications",
                desc: "Receive alerts for risk events",
                value: notifications,
                onChange: setNotifications,
              },
              {
                label: "Critical Alerts Only",
                desc: "Only notify for high-risk events",
                value: criticalAlerts,
                onChange: setCriticalAlerts,
              },
              {
                label: "Weekly Summary Report",
                desc: "Receive weekly behavioral analysis",
                value: weeklyReport,
                onChange: setWeeklyReport,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl bg-secondary/30 p-4"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <button
                  onClick={() => item.onChange(!item.value)}
                  className={`relative h-7 w-12 rounded-full transition-colors ${
                    item.value ? "bg-primary" : "bg-secondary"
                  }`}
                  aria-label={`Toggle ${item.label}`}
                >
                  <span
                    className={`absolute top-0.5 h-6 w-6 rounded-full bg-background transition-all ${
                      item.value ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sensitivity Settings */}
        <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Sensitivity
            </h3>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">Silence Detection Level</p>
                <span className="font-mono text-sm font-bold text-primary">{sensitivity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={sensitivity}
                onChange={(e) => setSensitivity(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Low Sensitivity</span>
                <span>High Sensitivity</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">Pause Threshold</p>
                <span className="font-mono text-sm font-bold text-chart-2">{pauseThreshold.toFixed(1)}s</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.1"
                value={pauseThreshold}
                onChange={(e) => setPauseThreshold(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>0.5s</span>
                <span>5.0s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hardware */}
        <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-chart-3" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Hardware
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-xl bg-secondary/30 p-4">
              <div>
                <p className="text-sm font-medium text-foreground">ESP32-S3 DevKit</p>
                <p className="font-mono text-xs text-muted-foreground">Firmware v2.4.1</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Connected
              </span>
            </div>

            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/50 disabled:opacity-50"
            >
              {syncing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" /> Sync Hardware Device
                </>
              )}
            </button>

            <button className="flex items-center justify-center gap-2 rounded-xl border border-chart-4/30 bg-chart-4/5 px-4 py-3 text-sm font-medium text-chart-4 transition-colors hover:bg-chart-4/10">
              Unpair Device
            </button>
          </div>
        </div>
      </div>

      {/* Privacy & Save */}
      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Privacy & Data
          </h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-secondary/30 p-4">
            <p className="text-sm font-medium text-foreground">Data Retention</p>
            <p className="text-xs text-muted-foreground">Voice data is processed in real-time and not stored permanently.</p>
          </div>
          <div className="rounded-xl bg-secondary/30 p-4">
            <p className="text-sm font-medium text-foreground">Encryption</p>
            <p className="text-xs text-muted-foreground">All data transmitted via AES-256 end-to-end encryption.</p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {saved ? (
              <>
                <CheckCircle className="h-4 w-4" /> Saved
              </>
            ) : (
              "Save Settings"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
