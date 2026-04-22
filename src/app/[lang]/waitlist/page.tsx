"use client"

import { use, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Sparkles } from "lucide-react"
import { getDictionary, type Lang } from "@/lib/i18n"

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  language: z.string().min(1),
  founderType: z.string().min(1),
  stage: z.string().min(1),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function WaitlistPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  const dict = getDictionary(lang as Lang)
  const d = dict.waitlistPage
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 900))
    setSubmitted(true)
  }

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 gap-1.5">
            <Sparkles className="h-3 w-3" />
            {d.badge}
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-3">{d.headline}</h1>
          <p className="text-muted-foreground">{d.subheadline}</p>
        </div>

        <Card className="p-6 md:p-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <CheckCircle className="h-14 w-14 text-green-500 mx-auto mb-4" />
              <p className="font-semibold text-lg">{d.form.success}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {[
                { key: "name", label: d.form.name, type: "text" },
                { key: "email", label: d.form.email, type: "email" },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="text-sm font-medium block mb-1.5">{label}</label>
                  <input
                    {...register(key as "name" | "email")}
                    type={type}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors[key as keyof FormData] && (
                    <p className="text-xs text-red-500 mt-1">{errors[key as keyof FormData]?.message}</p>
                  )}
                </div>
              ))}

              {[
                { key: "language", label: d.form.language, options: d.form.languages },
                { key: "founderType", label: d.form.founderType, options: d.form.founderTypes },
                { key: "stage", label: d.form.stage, options: d.form.stages },
              ].map(({ key, label, options }) => (
                <div key={key}>
                  <label className="text-sm font-medium block mb-1.5">{label}</label>
                  <select
                    {...register(key as "language" | "founderType" | "stage")}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">—</option>
                    {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}

              <div>
                <label className="text-sm font-medium block mb-1.5">{d.form.notes}</label>
                <textarea
                  {...register("notes")}
                  rows={3}
                  placeholder={d.form.notesPlaceholder}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "..." : d.form.submit}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  )
}
