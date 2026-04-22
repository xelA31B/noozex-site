import { getDictionary, type Lang } from "@/lib/i18n"
import { HeroSection } from "@/components/sections/HeroSection"
import { ProblemSection } from "@/components/sections/ProblemSection"
import { SolutionSection } from "@/components/sections/SolutionSection"
import { HowItWorksSection } from "@/components/sections/HowItWorksSection"
import { ScoringSection } from "@/components/sections/ScoringSection"
import { PricingSection } from "@/components/sections/PricingSection"
import { FAQSection } from "@/components/sections/FAQSection"
import { FinalCTASection } from "@/components/sections/FinalCTASection"

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = getDictionary(lang as Lang)

  return (
    <>
      <HeroSection lang={lang as Lang} dict={dict.hero} scoringExample={dict.scoring.example} />
      <ProblemSection dict={dict.problem} />
      <SolutionSection dict={dict.solution} />
      <HowItWorksSection dict={dict.howItWorks} />
      <ScoringSection lang={lang as Lang} dict={dict.scoring} />
      <PricingSection lang={lang as Lang} dict={dict.pricing} />
      <FAQSection dict={dict.faq} />
      <FinalCTASection lang={lang as Lang} dict={dict.finalCta} />
    </>
  )
}
