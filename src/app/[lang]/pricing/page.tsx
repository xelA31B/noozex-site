import { getDictionary, type Lang } from "@/lib/i18n"
import { PricingSection } from "@/components/sections/PricingSection"
import { FAQSection } from "@/components/sections/FAQSection"
import { FinalCTASection } from "@/components/sections/FinalCTASection"
import { Badge } from "@/components/ui/badge"

export default async function PricingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = getDictionary(lang as Lang)

  return (
    <>
      <section className="py-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <Badge variant="outline" className="mb-4">{dict.pricing.badge}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{dict.pricingPage.headline}</h1>
          <p className="text-muted-foreground text-lg">{dict.pricingPage.subheadline}</p>
        </div>
      </section>
      <PricingSection lang={lang as Lang} dict={dict.pricing} />
      <FAQSection dict={{ badge: "FAQ", headline: dict.pricingPage.faqHeadline, items: dict.pricingPage.faqItems }} />
      <FinalCTASection lang={lang as Lang} dict={dict.finalCta} />
    </>
  )
}
