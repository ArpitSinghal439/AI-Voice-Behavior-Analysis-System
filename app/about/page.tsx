import Link from "next/link"
import {
  Brain,
  Mic,
  Activity,
  Shield,
  Cpu,
  BarChart3,
  ArrowRight,
  Users,
  Heart,
  Lightbulb,
} from "lucide-react"

const team = [
  { name: "AI Analysis Engine", role: "Core Intelligence", icon: Brain },
  { name: "Voice Processing", role: "Audio Pipeline", icon: Mic },
  { name: "Pattern Detection", role: "Behavioral ML", icon: Activity },
  { name: "Hardware Layer", role: "ESP32 Integration", icon: Cpu },
]

const timeline = [
  {
    phase: "Phase 1",
    title: "Research & Concept",
    description: "Identified the gap in mental health monitoring -- existing tools rely on text sentiment, ignoring behavioral signals like silence and hesitation.",
  },
  {
    phase: "Phase 2",
    title: "AI Model Development",
    description: "Built custom ML models trained on pause patterns, voice energy fluctuations, and silence duration to detect emotional distress signals.",
  },
  {
    phase: "Phase 3",
    title: "Hardware Integration",
    description: "Integrated ESP32-S3 microphone devices for continuous, real-time audio capture with low-latency streaming via WebSocket.",
  },
  {
    phase: "Phase 4",
    title: "Platform Launch",
    description: "Deployed a full-stack web platform with real-time dashboards, analytics, alert systems, and privacy-first architecture.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <span className="text-base font-bold text-foreground">Silence AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Home</Link>
            <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Privacy</Link>
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              Open App <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center gap-6 px-6 pt-32 pb-16 text-center">
        <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
          About <span className="text-primary">Silence AI</span>
        </h1>
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
          Silence AI is a real-time mental distress detection platform that analyzes what people
          {"don't"} say. By focusing on pauses, hesitation, voice energy drops, and behavioral
          patterns, we detect hidden emotional distress before it escalates.
        </p>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            {
              icon: Heart,
              title: "Our Mission",
              description: "To provide early detection of mental distress using AI that understands human behavior beyond surface-level text analysis.",
            },
            {
              icon: Lightbulb,
              title: "Our Approach",
              description: "We analyze the space between words -- pauses, hesitation, silence duration -- to build a deeper understanding of emotional state.",
            },
            {
              icon: Users,
              title: "Who It Helps",
              description: "Healthcare providers, counselors, caregivers, and individuals seeking proactive mental health monitoring.",
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border bg-card/30 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">How It Works</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item, i) => (
              <div key={item.phase} className="relative flex flex-col gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5">
                  <span className="font-mono text-sm font-bold text-primary">{item.phase}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Technology Stack</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/60 p-6 text-center backdrop-blur-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <member.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
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
            <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Home</Link>
            <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Privacy</Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
