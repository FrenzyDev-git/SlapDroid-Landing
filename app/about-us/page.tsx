'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { GithubLogo, ArrowUpRight } from '@phosphor-icons/react'

export default function AboutUsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SlapDroid
              </Link>
              <div className="hidden md:flex items-center gap-8">
                <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
                <Link href="/about-us" className="text-foreground font-semibold">About</Link>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-card transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
            {mobileMenuOpen && (
              <div className="md:hidden pb-4 space-y-3">
                <Link href="/#features" onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-card rounded-lg transition-colors">
                  Features
                </Link>
                <Link href="/faq" onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-card rounded-lg transition-colors">
                  FAQ
                </Link>
                <Link href="/about-us" onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-foreground font-semibold hover:bg-card rounded-lg transition-colors">
                  About
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Hero */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Still building. Still improving.
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
              Built by one person.<br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                In a small room.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              No team. No funding. No corporate roadmap. Just a stupid idea, a terminal, and three weeks of building.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 space-y-5">
              <h2 className="text-2xl font-bold">The Origin</h2>
              <p className="text-muted-foreground leading-relaxed">
                SlapMac existed on Mac. Nobody built it for Android. That was enough reason.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                SlapDroid started as a weekend experiment — slap the back of your phone, hear it react. Simple premise. Three weeks later it became a real app with floating lips, a dynamic sound pool, and a global leaderboard. Still shipping. Still improving.
              </p>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 space-y-5">
              <h2 className="text-2xl font-bold">The Builder</h2>
              <div className="flex items-center gap-4 mb-2">
                <img
                  src="https://github.com/FrenzyDev-git.png"
                  alt="Faisal"
                  className="w-14 h-14 rounded-full border border-border/50"
                />
                <div>
                  <p className="font-semibold text-foreground">Faisal</p>
                  <p className="text-sm text-muted-foreground">@FrenzyDev</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Self-taught developer. Builds things that probably shouldn&apos;t exist but somehow do. SlapDroid is one of them.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Stack: Next.js · Supabase · Capacitor · Tailwind. Built on Linux. Deployed from a single repo. No overthinking, just shipping.
              </p>
              <a
                href="https://github.com/FrenzyDev-git"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-white/20 transition-all duration-200"
              >
                <GithubLogo weight="duotone" className="w-4 h-4" />
                FrenzyDev-git
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 space-y-5">
              <h2 className="text-2xl font-bold">What&apos;s Next</h2>
              <p className="text-muted-foreground leading-relaxed">
                Global leaderboard. More sounds. Things that probably shouldn&apos;t exist. SlapDroid is a living project — updates ship when they&apos;re ready.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Follow the build on GitHub. Everything is open.
              </p>
            </Card>

          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-muted-foreground">
              &copy; 2026 SlapDroid. Built by{' '}
              <a href="https://github.com/FrenzyDev-git" target="_blank" rel="noopener noreferrer"
                className="hover:text-foreground transition-colors">FrenzyDev</a>.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}