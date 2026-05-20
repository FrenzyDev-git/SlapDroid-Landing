'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import FloatingLips  from '@/components/FloatingLips'
import { Download, Zap, BarChart3, Volume2, Lock, Smartphone, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { LockSimple, SpeakerHigh, DeviceMobile, DownloadSimple, User, HandPointing, SpeakerSimpleHigh, Lightning, ChartBar, WifiSlash, ShieldCheck, Trophy } from "@phosphor-icons/react";
import { FeaturesSection } from '@/components/FeaturesSection'

export default function SlapDroidLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <a href="#" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SlapDroid
              </a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
                <Link href="/about-us" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
                <a
                  href="https://github.com/FrenzyDev-git/SlapDroid-Apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-foreground/30 rounded-full text-foreground hover:bg-foreground/10 hover:border-foreground/50 transition-all duration-300"
                >
                  GitHub
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-card transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden pb-4 space-y-3">
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-card rounded-lg transition-colors"
                >
                  Features
                </a>
                <Link
                  href="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-card rounded-lg transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="/about-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-card rounded-lg transition-colors"
                >
                  About
                </Link>
                <a
                  href="https://github.com/FrenzyDev-git/SlapDroid-Apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 border border-foreground/30 rounded-lg text-foreground hover:bg-foreground/10 hover:border-foreground/50 transition-colors"
                >
                  GitHub
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          {/* Floating lips animation */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <FloatingLips />
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-20">
            {/* Title */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight text-balance tracking-tight">
              <span className="text-foreground electric-heading thunder-text">Slap Your</span>{' '}
              <span className="neon-text electric-heading">
                Phone.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
              React sounds on every hit. Compete with the world for the highest slap count. Every slap hits different
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: <LockSimple weight="duotone" className="w-4 h-4" />, label: "Online/Offline", color: "text-primary" },
              { icon: <SpeakerHigh weight="duotone" className="w-4 h-4" />, label: "No Ads", color: "text-secondary" },
              { icon: <DeviceMobile weight="duotone" className="w-4 h-4" />, label: "No Account", color: "text-primary" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-medium text-muted-foreground hover:text-foreground hover:border-white/20 transition-all duration-200"
              >
                <span className={badge.color}>{badge.icon}</span>
                {badge.label}
              </div>
            ))}
          </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href="https://example.com/slapdroid.apk" download>
                  <Download className="w-5 h-5 mr-2" />
                  Download for Android
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeaturesSection />


        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-5xl sm:text-6xl font-black neon-text">
        How It Works
      </h2>
      <p className="text-lg text-muted-foreground">Get started in 3 simple steps</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {[
        {
          icon: <DownloadSimple weight="duotone" className="w-8 h-8" />,
          color: "bg-primary/20 text-primary group-hover:bg-primary/30",
          border: "hover:border-primary/50 hover:shadow-primary/20",
          title: "Step 1: Download APK",
          desc: "Click the download button and grab the SlapDroid APK. It's lightweight, safe, and ready to install."
        },
        {
          icon: <User weight="duotone" className="w-8 h-8" />,
          color: "bg-secondary/20 text-secondary group-hover:bg-secondary/30",
          border: "hover:border-secondary/50 hover:shadow-secondary/20",
          title: "Step 2: Choose Username",
          desc: "Pick a unique username. Your slaps will appear on the global leaderboard."
        },
        {
          icon: <SpeakerSimpleHigh weight="duotone" className="w-8 h-8" />,
          color: "bg-primary/20 text-primary group-hover:bg-primary/30",
          border: "hover:border-primary/50 hover:shadow-primary/20",
          title: "Step 3: Slap & Compete",
          desc: "Slap your phone. Random moan plays. Your counter goes up. Climb the ranks."
        },
      ].map((step) => (
        <div
  key={step.title}
  className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${step.border}`}
>
          <div className={`mb-6 inline-flex p-4 rounded-2xl transition-colors ${step.color}`}>
            {step.icon}
          </div>
          <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
          <p className="text-muted-foreground">{step.desc}</p>
        </div>
      ))}

    </div>
  </div>
</section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-balance neon-text">
              Ready to Slap?
            </h2>
            <p className="text-lg text-muted-foreground">
              Download SlapDroid now and start detecting those slaps. It&apos;s free, it&apos;s fun, and it&apos;s waiting for you.
            </p>
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href="https://example.com/slapdroid.apk" download>
                <Download className="w-5 h-5 mr-2" />
                Download Now
              </a>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer id="footer" className="border-t border-border/50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-muted-foreground">
              &copy; 2026 SlapDroid. All rights reserved.
            </p>

          </div>
        </footer>
      </div>
    </div>
  )
}
