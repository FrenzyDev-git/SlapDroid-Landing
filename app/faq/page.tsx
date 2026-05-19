'use client'

import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function FAQPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const faqs = [
    {
      q: "Is SlapDroid safe to install?",
      a: "Yes. SlapDroid is open source — you can inspect every line of code on GitHub. It requests only accelerometer and audio permissions. No internet required for core features, no data collected, no background processes when the app is closed."
    },
    {
      q: "Does it work on iPhone?",
      a: "No. SlapDroid is Android only. iPhones restrict accelerometer access in ways that make slap detection unreliable. Android gives us the direct sensor access we need."
    },
    {
      q: "Is it really free?",
      a: "Yes, completely free. No ads, no subscriptions, no hidden costs. Free forever."
    },
    {
      q: "Do I need an account?",
      a: "You pick a username on first launch — that's it. No email, no password, no signup form. Your username is how you appear on the global leaderboard."
    },
    {
      q: "Does it collect my data?",
      a: "Only your username and slap count are stored in our database for the leaderboard. Nothing else. No location, no device info, no analytics."
    },
    {
      q: "Does it work offline?",
      a: "Yes. Slap detection, sounds, and the counter all work fully offline. Internet is only needed to sync your slap count to the global leaderboard."
    },
    {
      q: "How do I install the APK?",
      a: "Download the APK from GitHub Releases. On your Android phone go to Settings → Security → Enable 'Install from Unknown Sources'. Then tap the downloaded APK file and install. Done."
    },
    {
      q: "How does the sound system work?",
      a: "Every slap plays a random sound from a handpicked pool. The pool is dynamically shuffled so you never hear the same sound twice in a row. The more sounds in the pool, the more chaotic and fun it gets."
    },
    {
      q: "How does the leaderboard work?",
      a: "Every slap increments your count which syncs to the global leaderboard when you have internet. Open the leaderboard in-app to see your rank, search for friends, and compete for the top spot."
    },
    {
      q: "What if I lose my phone or reinstall the app?",
      a: "Just enter the same username on your new device. Your slap count will be restored from the leaderboard database automatically."
    },
    {
      q: "Will it drain my battery?",
      a: "Only when the app is actively open. The accelerometer usage is minimal. When you close the app, SlapDroid consumes zero battery — there are no background processes."
    },
    {
      q: "Can I use it with a phone case?",
      a: "Yes. The accelerometer detects impact through most cases. Thicker cases may require a slightly harder slap to trigger detection."
    },
    {
      q: "Why not on the Play Store?",
      a: "Direct APK distribution is faster and keeps us independent. No review delays, no store fees, no policy restrictions. Download directly from GitHub Releases and install in seconds."
    },
    {
      q: "What Android versions are supported?",
      a: "Android 10 and above."
    },
  ]

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
                <Link href="/faq" className="text-foreground font-semibold">FAQ</Link>
                <Link href="/about-us" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
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
                  className="block w-full text-left px-4 py-2 text-foreground font-semibold hover:bg-card rounded-lg transition-colors">
                  FAQ
                </Link>
                <Link href="/about-us" onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-card rounded-lg transition-colors">
                  About
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl sm:text-6xl font-bold text-balance mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-muted-foreground">
                Got questions? We&apos;ve got answers.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem
  key={i}
  value={`q${i + 1}`}
  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-4"
>
                  <AccordionTrigger className="hover:no-underline text-left font-semibold">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-3">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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