"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { XCircle } from "lucide-react"

interface ProblemSectionProps {
  dict: {
    badge: string
    headline: string
    subheadline: string
    cards: readonly { title: string; desc: string }[]
  }
}

export function ProblemSection({ dict }: ProblemSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">{dict.badge}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{dict.headline}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">{dict.subheadline}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dict.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-border/50 bg-background"
            >
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                <h3 className="font-semibold text-sm">{card.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
