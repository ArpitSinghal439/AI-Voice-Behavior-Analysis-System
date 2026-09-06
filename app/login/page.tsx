"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Brain, Eye, EyeOff, ArrowRight, Shield, Lock } from "lucide-react"

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [consent, setConsent] = useState(false)
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Side - Branding */}
      <div className="hidden flex-1 flex-col justify-between border-r border-border bg-card/30 p-12 lg:flex">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <span className="text-base font-bold text-foreground">Silence AI</span>
        </Link>

        <div className="flex flex-col gap-6">
          <h1 className="text-balance text-4xl font-bold leading-tight text-foreground">
            AI that listens{" "}
            <span className="text-primary">beyond words</span>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            Detect hidden emotional distress through silence patterns, voice energy analysis, and
            behavioral intelligence. Privacy-first by design.
          </p>
          <div className="flex flex-col gap-3">
            {[
              { icon: Shield, text: "Consent-based data collection" },
              { icon: Lock, text: "AES-256 end-to-end encryption" },
              { icon: Brain, text: "Explainable AI -- no black box" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our privacy-first approach to mental health AI.
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <span className="text-base font-bold text-foreground">Silence AI</span>
          </div>

          <div className="mb-8 flex flex-col gap-2 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-foreground">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isSignUp
                ? "Join Silence AI to start monitoring behavioral patterns."
                : "Sign in to access your Silence AI dashboard."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isSignUp && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-medium text-muted-foreground">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-medium text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-border bg-secondary/30 px-4 py-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <label className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-primary"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium text-foreground">
                    I consent to data usage
                  </span>
                  <span className="text-[10px] leading-relaxed text-muted-foreground">
                    I understand that my voice data will be analyzed by AI for behavioral pattern
                    detection. I can revoke consent at any time.
                  </span>
                </div>
              </label>
            )}

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {isSignUp ? "Create Account" : "Sign In"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Home</Link>
            <Link href="/about" className="text-xs text-muted-foreground transition-colors hover:text-foreground">About</Link>
            <Link href="/privacy" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Privacy</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
