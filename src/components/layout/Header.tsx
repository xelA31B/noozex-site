"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Zap } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { type Lang } from "@/lib/i18n"

interface HeaderProps {
  lang: Lang
  dict: {
    product: string
    pricing: string
    about: string
    contact: string
    getAccess: string
    menu: string
  }
}

export function Header({ lang, dict }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const otherLang = lang === "en" ? "ru" : "en"

  const navLinks = [
    { href: `/${lang}/product`, label: dict.product },
    { href: `/${lang}/pricing`, label: dict.pricing },
    { href: `/${lang}/about`, label: dict.about },
    { href: `/${lang}/contact`, label: dict.contact },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background">
              <Zap className="h-4 w-4" />
            </div>
            NOOZEX
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={`/${otherLang}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
            >
              {otherLang === "ru" ? "RU" : "EN"}
            </Link>
            <Link href={`/${lang}/waitlist`} className={cn(buttonVariants({ size: "sm" }))}>
              {dict.getAccess}
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href={`/${otherLang}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground px-2 py-1 rounded-md"
            >
              {otherLang === "ru" ? "RU" : "EN"}
            </Link>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex items-center gap-2 font-bold text-xl mb-8">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background">
                    <Zap className="h-4 w-4" />
                  </div>
                  NOOZEX
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="py-2.5 px-3 text-base rounded-lg hover:bg-muted transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-6">
                  <Link href={`/${lang}/waitlist`} onClick={() => setOpen(false)} className={cn(buttonVariants(), "w-full justify-center")}>
                    {dict.getAccess}
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
