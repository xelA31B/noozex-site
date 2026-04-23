"use client"

import { use } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CheckCircle, Circle, AlertTriangle, TrendingUp, Users, DollarSign, Zap, BarChart3 } from "lucide-react"
import { getDictionary, type Lang } from "@/lib/i18n"

const riskCards = [
  { label: "Market Risk",       severity: "medium", color: "text-blue-500",   bg: "bg-blue-500/10 border-blue-500/20",     desc: "Crowded SaaS market, differentiation needed" },
  { label: "Competition Risk",  severity: "high",   color: "text-purple-500", bg: "bg-purple-500/10 border-purple-500/20", desc: "Several established players with similar positioning" },
  { label: "Problem Risk",      severity: "low",    color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/20", desc: "Clear pain point, founders actively seek validation tools" },
  { label: "Monetization Risk", severity: "low",    color: "text-green-500",  bg: "bg-green-500/10 border-green-500/20",   desc: "Clear B2C SaaS model, proven price points" },
  { label: "Execution Risk",    severity: "medium", color: "text-red-400",    bg: "bg-red-400/10 border-red-400/20",       desc: "Solo founder, limited resources for rapid scaling" },
]

const tasks = [
  { done: true, label: "Research 10 potential customers" },
  { done: true, label: "Set up landing page for idea test" },
  { done: false, label: "Run 5 customer interviews" },
  { done: false, label: "Measure sign-up conversion rate" },
  { done: false, label: "Analyze feedback and update positioning" },
]

export default function DemoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  const dict = getDictionary(lang as Lang)

  return (
    <section className="py-12 bg-muted/10 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-3">Demo Preview</Badge>
          <h1 className="text-3xl font-bold tracking-tight">
            {lang === "ru" ? "Пример анализа: SaaS для фаундеров" : "Sample Analysis: Founder SaaS Tool"}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Score panel */}
          <Card className="p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500" />
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 rounded bg-foreground text-background flex items-center justify-center">
                <Zap className="h-3.5 w-3.5" />
              </div>
              <span className="font-semibold text-sm">Startup Score</span>
            </div>
            <div className="flex justify-center mb-4">
              <div className="relative">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
                  <motion.circle
                    cx="50" cy="50" r="45" fill="none" strokeWidth="8" strokeLinecap="round"
                    className="stroke-yellow-500"
                    strokeDasharray={2 * Math.PI * 45}
                    initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - 0.61) }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-yellow-500">61</span>
                  <span className="text-xs text-muted-foreground">/100</span>
                </div>
              </div>
            </div>
            <p className="text-center text-sm font-medium mb-4">
              {lang === "ru" ? "Валидировать до разработки" : "Validate before building"}
            </p>
            <div className="space-y-2">
              {[
                { label: "Market", value: 58, color: "bg-blue-500" },
                { label: "Competition", value: 42, color: "bg-purple-500" },
                { label: "Problem", value: 75, color: "bg-orange-500" },
                { label: "Monetization", value: 64, color: "bg-green-500" },
                { label: "Execution", value: 70, color: "bg-red-400" },
              ].map((d) => (
                <div key={d.label} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-20">{d.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-muted/40 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${d.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${d.value}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-5 text-right">{d.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Risk map */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              {lang === "ru" ? "Карта рисков" : "Risk Map"}
            </h3>
            <div className="space-y-3">
              {riskCards.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-3 rounded-lg border ${r.bg}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold">{r.label}</span>
                    <Badge variant="outline" className={`text-xs ${r.color} border-current`}>{r.severity}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.desc}</p>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Validation tasks */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              {lang === "ru" ? "План валидации" : "Validation Plan"}
            </h3>
            <div className="mb-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>{lang === "ru" ? "Прогресс" : "Progress"}</span>
                <span>2/5</span>
              </div>
              <div className="h-2 bg-muted/40 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "40%" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
            </div>
            <div className="space-y-2.5">
              {tasks.map((task, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  {task.done
                    ? <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    : <Circle className="h-4 w-4 text-muted-foreground/40 mt-0.5 shrink-0" />
                  }
                  <span className={`text-sm ${task.done ? "line-through text-muted-foreground/50" : "text-muted-foreground"}`}>
                    {task.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Metrics */}
          <Card className="p-6 lg:col-span-2">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-500" />
              {lang === "ru" ? "Метрики валидации" : "Validation Metrics"}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Users, label: lang === "ru" ? "Лендинг-визиты" : "Landing Visits", value: "234", trend: "+12%" },
                { icon: TrendingUp, label: lang === "ru" ? "Конверсия" : "Signup Rate", value: "6.4%", trend: "+2.1%" },
                { icon: DollarSign, label: lang === "ru" ? "Платёжная готовность" : "Willingness to Pay", value: "7/10", trend: "" },
              ].map((m, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-muted/30">
                  <m.icon className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-bold">{m.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
                  {m.trend && <p className="text-xs text-green-500 font-medium mt-1">{m.trend}</p>}
                </div>
              ))}
            </div>
          </Card>

          {/* Recommendation */}
          <Card className="p-6 border-blue-500/30 bg-blue-500/5">
            <h3 className="font-semibold mb-3 text-blue-600 dark:text-blue-400">
              {lang === "ru" ? "Рекомендация" : "Recommendation"}
            </h3>
            <p className="text-2xl font-black mb-3">
              {lang === "ru" ? "Продолжай валидацию" : "Continue Validating"}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {lang === "ru"
                ? "Сигналы спроса обнадёживают. Завершите интервью и улучшите дифференциацию до начала разработки."
                : "Demand signals are encouraging. Complete interviews and sharpen differentiation before writing code."}
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
