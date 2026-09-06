"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Brain,
  Activity,
  ShieldCheck,
  Mic,
  ArrowRight,
  Cpu,
  BarChart3,
  Eye,
  Lock,
  ChevronRight,
} from "lucide-react"

const features = [
  {
    icon: Mic,
    title: "Silence Detection",
    description:
      "Analyzes pauses, hesitation patterns, and silence durations to detect hidden emotional distress signals.",
  },
  {
    icon: Activity,
    title: "Voice Energy Analysis",
    description:
      "Monitors real-time voice energy levels, tone fluctuations, and speech cadence to identify behavioral changes.",
  },
  {
    icon: Brain,
    title: "AI Pattern Recognition",
    description:
      "Machine learning models identify recurring distress patterns across sessions using behavioral intelligence.",
  },
  {
    icon: Cpu,
    title: "ESP32 Hardware Integration",
    description:
      "Connects with ESP32-S3 microphone devices for continuous, real-time audio stream analysis.",
  },
  {
    icon: BarChart3,
    title: "Trend Analytics",
    description:
      "Track emotional trends over days and weeks with detailed session history and risk score progression.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-First Design",
    description:
      "Consent-based data collection with end-to-end encryption. Your data stays yours.",
  },
]

const steps = [
  {
    step: "01",
    title: "Connect & Consent",
    description: "Users connect their device or upload voice notes with full consent-based privacy controls.",
  },
  {
    step: "02",
    title: "AI Listens to Silence",
    description: "Our AI analyzes not just words, but the gaps between them -- pauses, hesitation, and energy drops.",
  },
  {
    step: "03",
    title: "Insight Generation",
    description: "Real-time risk scoring, behavioral pattern detection, and personalized distress indicators.",
  },
  {
    step: "04",
    title: "Early Intervention",
    description: "Timely alerts and recommendations enable proactive support before a crisis escalates.",
  },
]

function AnimatedWave() {
  const [bars, setBars] = useState<number[]>(Array.from({ length: 40 }, (_, i) => 20 + (i % 5) * 15))

  useEffect(() => {
    setBars(Array.from({ length: 40 }, () => Math.random() * 100))
    const interval = setInterval(() => {
      setBars((prev) =>
        prev.map((v) => Math.max(10, Math.min(100, v + (Math.random() - 0.5) * 30)))
      )
    }, 150)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-24 items-end gap-[2px]">
      {bars.map((height, i) => (
        <div
          key={i}
          className="w-1.5 rounded-t-full transition-all duration-150"
          style={{
            height: `${height}%`,
            backgroundColor: height > 60
              ? "hsl(174, 72%, 52%)"
              : height > 35
                ? "hsl(199, 89%, 48%)"
                : "hsl(220, 16%, 25%)",
            opacity: 0.7 + (height / 100) * 0.3,
          }}
        />
      ))}
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <span className="text-base font-bold text-foreground">Silence AI</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              How It Works
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:inline-flex"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Open App <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-chart-2/5 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-medium text-primary">Real-Time AI Analysis</span>
          </div>

          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            AI that listens{" "}
            <span className="text-primary">beyond words</span>
          </h1>

          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Silence AI detects hidden mental distress through silence patterns, pause durations,
            voice energy drops, and behavioral signals -- not just what you say, but what you
            {"don't"} say.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
            >
              Launch Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
            >
              See How It Works
            </Link>
          </div>
        </div>

        {/* Animated Wave Visualization */}
        <div className="relative z-10 mt-16 w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mic className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Live Voice Stream</span>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Analyzing
            </span>
          </div>
          <AnimatedWave />
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="rounded-lg bg-secondary/60 p-3 text-center">
              <p className="font-mono text-lg font-bold text-primary">1.8s</p>
              <p className="text-[10px] text-muted-foreground">Avg Pause</p>
            </div>
            <div className="rounded-lg bg-secondary/60 p-3 text-center">
              <p className="font-mono text-lg font-bold text-foreground">62%</p>
              <p className="text-[10px] text-muted-foreground">Voice Energy</p>
            </div>
            <div className="rounded-lg bg-secondary/60 p-3 text-center">
              <p className="font-mono text-lg font-bold text-chart-3">38</p>
              <p className="text-[10px] text-muted-foreground">Risk Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Behavioral Intelligence, Not Just Sentiment
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Silence AI goes deeper than surface-level text analysis to detect real distress signals.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md transition-colors hover:border-primary/30 hover:bg-card/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t border-border bg-card/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
              How Silence AI Works
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              From audio input to actionable insight in four steps.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.step} className="relative flex flex-col gap-4">
                {i < steps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-px w-8 translate-x-full bg-border lg:block" />
                )}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5">
                  <span className="font-mono text-lg font-bold text-primary">{step.step}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "94.2%", label: "Detection Accuracy" },
            { value: "< 2s", label: "Analysis Latency" },
            { value: "340+", label: "Behavior Patterns" },
            { value: "24/7", label: "Real-Time Monitoring" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/60 p-8 text-center backdrop-blur-md"
            >
              <span className="font-mono text-3xl font-bold text-primary">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card/30 py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Eye className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Start Listening Beyond Words
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Launch the Silence AI dashboard to experience real-time voice analysis, behavioral pattern
            detection, and early distress intervention powered by AI.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
            >
              Open Dashboard <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Lock className="h-4 w-4" /> Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-foreground">Silence AI</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</Link>
            <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Privacy</Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link>
          </div>
          <p className="text-xs text-muted-foreground">Built for a better tomorrow.</p>
        </div>
      </footer>
    </div>
  )
}
