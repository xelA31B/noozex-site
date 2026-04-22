"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ScoreCard } from "@/components/mockups/ScoreCard"
import { type Lang } from "@/lib/i18n"

interface ScoringSectionProps {
  lang: Lang
  dict: {
    badge: string
    headline: string
    subheadline: string
    dimensions: readonly { label: string; weight: string; color: string }[]
    example: {
      score: number
      confidence: string
      verdict: string
      risk: string
      nextStep: string
    }
  }
}

export function ScoringSection({ lang, dict }: ScoringSectionProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-4">{dict.badge}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{dict.headline}</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">{dict.subheadline}</p>
            <div className="space-y-3">
              {dict.dimensions.map((dim, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${dim.color} shrink-0`} />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm font-medium">{dim.label}</span>
                    <span className="text-sm text-muted-foreground font-mono">{dim.weight}</span>
                  </div>
                  <div className="w-32 h-1.5 bg-muted/40 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${dim.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: dim.weight }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.1 + 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <ScoreCard example={dict.example} lang={lang} />
          </div>
        </div>
      </div>
    </section>
  )
}
