"use client"

import { use, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Clock } from "lucide-react"
import { getDictionary, type Lang } from "@/lib/i18n"

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  topic: z.string().min(1),
  message: z.string().min(10),
})

type FormData = z.infer<typeof schema>

export default function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params)
  const dict = getDictionary(lang as Lang)
  const d = dict.contactPage
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    setSubmitted(true)
  }

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4">Contact</Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-3">{d.headline}</h1>
          <p className="text-muted-foreground">{d.subheadline}</p>
        </div>

        <Card className="p-6 md:p-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="font-semibold text-lg">{d.form.success}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">{d.form.name}</label>
                <input {...register("name")} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">{d.form.email}</label>
                <input {...register("email")} type="email" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">{d.form.topic}</label>
                <select {...register("topic")} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="">—</option>
                  {d.form.topics.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">{d.form.message}</label>
                <textarea {...register("message")} rows={4} placeholder={d.form.messagePlaceholder} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "..." : d.form.submit}
              </Button>
              <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" /> {d.form.responseTime}
              </p>
            </form>
          )}
        </Card>
      </div>
    </section>
  )
}
