import Link from "next/link"
import { Brain, Shield, Lock, Eye, Trash2, Server, ArrowRight } from "lucide-react"

const sections = [
  {
    icon: Shield,
    title: "Consent-Based Data Collection",
    points: [
      "All data collection requires explicit user consent before processing begins.",
      "Users must acknowledge and accept the data usage policy during onboarding.",
      "Consent can be withdrawn at any time, immediately stopping all data processing.",
      "No data is collected passively -- every input requires active user participation.",
    ],
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    points: [
      "All audio data is encrypted using AES-256 during transmission and processing.",
      "WebSocket connections use WSS (TLS 1.3) for hardware device streams.",
      "Encryption keys are rotated every 24 hours for maximum security.",
      "No unencrypted audio data is stored at any point in the pipeline.",
    ],
  },
  {
    icon: Eye,
    title: "Transparency & Control",
    points: [
      "Users can view exactly what data has been collected and how it was analyzed.",
      "Risk scores and behavior patterns are fully explainable -- no black-box AI.",
      "Users can download a complete copy of their data at any time.",
      "All AI recommendations are labeled as suggestions, not diagnoses.",
    ],
  },
  {
    icon: Server,
    title: "Data Processing",
    points: [
      "Voice data is processed in real-time and immediately discarded after analysis.",
      "Only derived metrics (pause duration, energy levels, risk scores) are stored.",
      "Raw audio is never permanently stored on our servers.",
      "Processing happens in isolated, ephemeral compute environments.",
    ],
  },
  {
    icon: Trash2,
    title: "Data Retention & Deletion",
    points: [
      "Session analytics are retained for 90 days by default, configurable by user.",
      "Users can delete all their data permanently with a single action.",
      "Deleted data is purged from all systems within 24 hours.",
      "No data is shared with third parties under any circumstances.",
    ],
  },
]

export default function PrivacyPage() {
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
            <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</Link>
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              Open App <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center gap-6 px-6 pt-32 pb-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
          Privacy & Consent
        </h1>
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
          Your privacy is not an afterthought -- it is the foundation of Silence AI. We believe that
          mental health technology must be built on trust, transparency, and user control.
        </p>
      </section>

      {/* Policy Sections */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="flex flex-col gap-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
              </div>
              <ul className="flex flex-col gap-2.5">
                {section.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span className="text-sm leading-relaxed text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
          <h3 className="text-lg font-semibold text-foreground">Questions About Your Privacy?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We are committed to full transparency. If you have any questions about how we handle your
            data, please reach out.
          </p>
          <p className="mt-4 font-mono text-sm text-primary">privacy@silence-ai.com</p>
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
            <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
