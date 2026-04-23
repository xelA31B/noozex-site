import { getDictionary, type Lang } from "@/lib/i18n"
import { SolutionSection } from "@/components/sections/SolutionSection"
import { HowItWorksSection } from "@/components/sections/HowItWorksSection"
import { ScoringSection } from "@/components/sections/ScoringSection"
import { FinalCTASection } from "@/components/sections/FinalCTASection"
import { Badge } from "@/components/ui/badge"

export default async function ProductPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = getDictionary(lang as Lang)

  return (
    <>
      <section className="py-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <Badge variant="outline" className="mb-4">{dict.solution.badge}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{dict.solution.headline}</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{dict.solution.subheadline}</p>
        </div>
      </section>
      <SolutionSection dict={dict.solution} hideHeader />
      <HowItWorksSection dict={dict.howItWorks} />
      <ScoringSection lang={lang as Lang} dict={dict.scoring} />
      <FinalCTASection lang={lang as Lang} dict={dict.finalCta} />
    </>
  )
}
