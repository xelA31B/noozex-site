"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { BarChart3, AlertTriangle, TrendingUp, ListChecks, CheckSquare, RefreshCw } from "lucide-react"

const icons = [BarChart3, AlertTriangle, TrendingUp, ListChecks, CheckSquare, RefreshCw]

interface SolutionSectionProps {
  dict: {
    badge: string
    headline: string
    subheadline: string
    items: readonly { title: string; desc: string }[]
  }
}

export function SolutionSection({ dict }: SolutionSectionProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">{dict.badge}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{dict.headline}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">{dict.subheadline}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dict.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl border border-border/50 bg-background hover:border-border transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
