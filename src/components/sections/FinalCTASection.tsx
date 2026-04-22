"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { type Lang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

interface FinalCTASectionProps {
  lang: Lang
  dict: {
    headline: string
    subheadline: string
    cta1: string
    cta2: string
  }
}

export function FinalCTASection({ lang, dict }: FinalCTASectionProps) {
  return (
    <section className="py-20 md:py-28 bg-foreground text-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{dict.headline}</h2>
          <p className="text-background/70 text-lg mb-8 max-w-xl mx-auto">{dict.subheadline}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href={`/${lang}/waitlist`} className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "gap-2")}>
              {dict.cta1}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={`/${lang}/pricing`} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-background/30 text-background hover:bg-background/10 hover:text-background")}>
              {dict.cta2}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
