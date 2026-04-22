import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { getDictionary, supportedLangs, type Lang } from "@/lib/i18n"

export async function generateStaticParams() {
  return supportedLangs.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const isRu = lang === "ru"
  return {
    title: {
      default: "NOOZEX — Startup Decision Engine",
      template: "%s | NOOZEX",
    },
    description: isRu
      ? "AI-платформа для фаундеров: оценивай идеи, выявляй риски, проверяй спрос и понимай, что делать дальше."
      : "AI-powered startup decision and execution engine. Score ideas, map risks, validate demand, and know what to do next.",
    openGraph: {
      title: "NOOZEX — Startup Decision Engine",
      description: isRu
        ? "Проверяй идеи стартапа до того, как потратишь месяцы на ненужную разработку."
        : "Validate startup ideas before you waste months building the wrong thing.",
      type: "website",
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!supportedLangs.includes(lang as Lang)) notFound()

  const dict = getDictionary(lang as Lang)

  return (
    <>
      <Header lang={lang as Lang} dict={dict.nav} />
      <main>{children}</main>
      <Footer lang={lang as Lang} dict={dict.footer} />
    </>
  )
}
