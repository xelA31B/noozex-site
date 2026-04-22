"use client"

import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, TrendingUp, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type Lang } from "@/lib/i18n"

interface ScoreCardProps {
  example: {
    score: number
    confidence: string
    verdict: string
    risk: string
    nextStep: string
  }
  lang: Lang
}

export function ScoreCard({ example }: ScoreCardProps) {
  const score = example.score
  const color = score >= 70 ? "text-green-500" : score >= 45 ? "text-yellow-500" : "text-red-500"
  const ringColor = score >= 70 ? "stroke-green-500" : score >= 45 ? "stroke-yellow-500" : "stroke-red-500"
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (score / 100) * circumference

  return (
    <Card className="w-full max-w-sm shadow-2xl border-border/50 p-6 bg-card relative overflow-hidden">
      {/* Subtle gradient top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-foreground text-background flex items-center justify-center">
            <Zap className="h-3.5 w-3.5" />
          </div>
          <span className="font-semibold text-sm">NOOZEX Analysis</span>
        </div>
        <Badge variant="secondary" className="text-xs">{example.confidence}</Badge>
      </div>

      {/* Score ring */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
            <motion.circle
              cx="50" cy="50" r="45" fill="none" strokeWidth="8"
              strokeLinecap="round"
              className={ringColor}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className={`text-4xl font-bold ${color}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {score}
            </motion.span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>
      </div>

      {/* Verdict */}
      <div className="text-center mb-5">
        <p className="font-semibold text-sm">{example.verdict}</p>
      </div>

      {/* Risk */}
      <div className="flex gap-2 items-start mb-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-snug">{example.risk}</p>
      </div>

      {/* Next step */}
      <div className="flex gap-2 items-start p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
        <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-snug">{example.nextStep}</p>
      </div>

      {/* Score bars */}
      <div className="mt-5 space-y-2">
        {[
          { label: "Market", value: 58, color: "bg-blue-500" },
          { label: "Competition", value: 42, color: "bg-purple-500" },
          { label: "Problem", value: 75, color: "bg-orange-500" },
          { label: "Monetization", value: 64, color: "bg-green-500" },
          { label: "Execution", value: 70, color: "bg-red-400" },
        ].map((dim) => (
          <div key={dim.label} className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-20 shrink-0">{dim.label}</span>
            <div className="flex-1 h-1.5 rounded-full bg-muted/40 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${dim.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${dim.value}%` }}
                transition={{ duration: 0.8, delay: 0.6 + Math.random() * 0.3, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-6 text-right">{dim.value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
