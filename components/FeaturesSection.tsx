import { Lightning, SpeakerHigh, ChartBar, WifiSlash, ShieldCheck, Trophy } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'

const features = [
  {
    icon: <Lightning weight="duotone" className="w-7 h-7" />,
    color: "bg-primary/15 text-primary group-hover:bg-primary/25",
    border: "hover:border-primary/50 hover:shadow-primary/10",
    title: "Slap Detection",
    desc: "Just slap your phone. The accelerometer detects it instantly — no calibration, no settings, no nonsense.",
  },
  {
    icon: <SpeakerHigh weight="duotone" className="w-7 h-7" />,
    color: "bg-secondary/15 text-secondary group-hover:bg-secondary/25",
    border: "hover:border-secondary/50 hover:shadow-secondary/10",
    title: "Random Sound Every Time",
    desc: "Every slap fires a random sound from a handpicked pool. Dynamically shuffled — never repetitive. The more sounds, the wilder it gets.",
  },
  {
    icon: <ChartBar weight="duotone" className="w-7 h-7" />,
    color: "bg-primary/15 text-primary group-hover:bg-primary/25",
    border: "hover:border-primary/50 hover:shadow-primary/10",
    title: "Slap Counter",
    desc: "Every slap tracked in real time. See your total, watch it climb, and flex on the global leaderboard.",
  },
  {
    icon: <WifiSlash weight="duotone" className="w-7 h-7" />,
    color: "bg-secondary/15 text-secondary group-hover:bg-secondary/25",
    border: "hover:border-secondary/50 hover:shadow-secondary/10",
    title: "Offline + Online Sync",
    desc: "Slaps work fully offline. When you reconnect, your count syncs to the global leaderboard automatically.",
  },
  {
    icon: <ShieldCheck weight="duotone" className="w-7 h-7" />,
    color: "bg-primary/15 text-primary group-hover:bg-primary/25",
    border: "hover:border-primary/50 hover:shadow-primary/10",
    title: "Zero Tracking",
    desc: "No analytics. No telemetry. No creepy data collection. Only your username and slap count touch our servers — nothing else.",
  },
  {
    icon: <Trophy weight="duotone" className="w-7 h-7" />,
    color: "bg-secondary/15 text-secondary group-hover:bg-secondary/25",
    border: "hover:border-secondary/50 hover:shadow-secondary/10",
    title: "Global Leaderboard",
    desc: "Compete with slappers worldwide. Climb the ranks, search for friends, and prove you slap the hardest.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-bold text-balance mb-5">
            Features That Slap
          </h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Everything you need. Nothing you don&apos;t.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <Card
  key={f.title}
  className={`group bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 p-8 cursor-pointer hover:shadow-xl hover:-translate-y-0.5 ${f.border}`}
>
              {/* Icon — square, not full width */}
              <div className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${f.color}`}>
                {f.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}