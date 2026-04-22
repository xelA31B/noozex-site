"use client"

import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQSectionProps {
  dict: {
    badge: string
    headline: string
    items: readonly { q: string; a: string }[]
  }
}

export function FAQSection({ dict }: FAQSectionProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4">{dict.badge}</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{dict.headline}</h2>
        </div>
        <Accordion multiple={false} className="space-y-2">
          {dict.items.map((item, i) => (
            <AccordionItem key={i} value={i} className="border border-border/50 rounded-xl px-5 data-open:border-border">
              <AccordionTrigger className="text-left font-medium text-sm py-4">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
