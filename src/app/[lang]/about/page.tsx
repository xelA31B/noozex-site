"use client"

import { use } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import { getDictionary, type Lang } from "@/lib/i18n"

export default function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  const dict = getDictionary(lang as Lang)
  const d = dict.aboutPage

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Badge variant="outline" className="mb-5">{d.badge}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">{d.headline}</h1>
          <div className="space-y-5">
            {d.manifesto.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 bg-muted/20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {d.principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-background border border-border/50"
              >
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For whom */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-6">{d.forWhom.headline}</h2>
          <ul className="space-y-3">
            {d.forWhom.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
