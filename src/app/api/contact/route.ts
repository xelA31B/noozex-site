import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, topic, message } = body

    await resend.emails.send({
      from: "NOOZEX Contact <onboarding@resend.dev>",
      to: "xela132503@gmail.com",
      subject: `Contact: ${topic} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #09090b; margin-bottom: 4px;">New Contact Message</h2>
          <p style="color: #71717a; margin-top: 0;">NOOZEX Contact Form</p>
          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #71717a; width: 80px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #71717a;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #71717a;">Topic</td><td style="padding: 8px 0;">${topic}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f4f4f5; border-radius: 8px;">
            <p style="margin: 0; color: #09090b; white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
          <p style="color: #a1a1aa; font-size: 12px;">NOOZEX · Validate before you build</p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Contact email error:", error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
