"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { type Lang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

interface PricingSectionProps {
  lang: Lang
  dict: {
    badge: string
    headline: string
    subheadline: string
    monthly: string
    plans: readonly {
      name: string
      price: string
      desc: string
      features: readonly string[]
      cta: string
      highlight: boolean
    }[]
  }
}

export function PricingSection({ lang, dict }: PricingSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">{dict.badge}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{dict.headline}</h2>
          <p className="text-muted-foreground">{dict.subheadline}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {dict.plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className={`h-full flex flex-col p-6 ${plan.highlight ? "border-foreground shadow-lg" : "border-border/50"}`}>
                {plan.highlight && (
                  <div className="text-xs font-semibold text-center mb-4 py-1 px-3 rounded-full bg-foreground text-background w-fit mx-auto">
                    Popular
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{plan.desc}</p>
                  <div className="mt-3">
                    <span className="text-3xl font-black">{plan.price}</span>
                    {plan.price !== "$0" && !plan.price.startsWith("From") && (
                      <span className="text-sm text-muted-foreground ml-1">/{dict.monthly}</span>
                    )}
                  </div>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${lang}/waitlist`}
                  className={cn(buttonVariants({ variant: plan.highlight ? "default" : "outline" }), "w-full justify-center")}
                >
                  {plan.cta}
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
