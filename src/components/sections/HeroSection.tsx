"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScoreCard } from "@/components/mockups/ScoreCard"
import { type Lang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  lang: Lang
  dict: {
    badge: string
    headline: string
    subheadline: string
    cta1: string
    cta2: string
    trustedBy: string
  }
  scoringExample: {
    score: number
    confidence: string
    verdict: string
    risk: string
    nextStep: string
  }
}

export function HeroSection({ lang, dict, scoringExample }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-5 gap-1.5">
              <Sparkles className="h-3 w-3" />
              {dict.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              {dict.headline}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              {dict.subheadline}
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Link href={`/${lang}/waitlist`} className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
                {dict.cta1}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={`/${lang}/product`} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                {dict.cta2}
              </Link>
            </div>
            <p className="text-xs text-muted-foreground/70 font-medium uppercase tracking-wider">
              {dict.trustedBy}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            <ScoreCard example={scoringExample} lang={lang} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
