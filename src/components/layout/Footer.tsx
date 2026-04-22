import Link from "next/link"
import { Zap } from "lucide-react"
import { type Lang } from "@/lib/i18n"

interface FooterProps {
  lang: Lang
  dict: {
    description: string
    product: string
    company: string
    links: {
      features: string
      pricing: string
      demo: string
      about: string
      contact: string
      waitlist: string
    }
    legal: string
    tagline: string
  }
}

export function Footer({ lang, dict }: FooterProps) {
  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-xl mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background">
                <Zap className="h-4 w-4" />
              </div>
              NOOZEX
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {dict.description}
            </p>
            <p className="mt-4 text-xs text-muted-foreground/60 font-medium uppercase tracking-wider">
              {dict.tagline}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{dict.product}</h3>
            <ul className="space-y-2.5">
              <li><Link href={`/${lang}/product`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{dict.links.features}</Link></li>
              <li><Link href={`/${lang}/pricing`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{dict.links.pricing}</Link></li>
              <li><Link href={`/${lang}/demo`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{dict.links.demo}</Link></li>
              <li><Link href={`/${lang}/waitlist`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{dict.links.waitlist}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{dict.company}</h3>
            <ul className="space-y-2.5">
              <li><Link href={`/${lang}/about`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{dict.links.about}</Link></li>
              <li><Link href={`/${lang}/contact`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{dict.links.contact}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NOOZEX. {dict.legal}
          </p>
        </div>
      </div>
    </footer>
  )
}
