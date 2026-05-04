import { NewsletterWelcomeEmail } from "@/components/emails/newsletter-welcome-email"
import { OTPEmail } from "@/components/emails/otp-email"
import React from "react"
import { Resend } from "resend"
import config from "./config"

let resendClient: Resend | null = null

export function getResendClient() {
  if (resendClient) {
    return resendClient
  }

  if (!config.email.apiKey || config.email.apiKey === "please-set-your-resend-api-key-here") {
    throw new Error("RESEND_API_KEY is not configured")
  }

  resendClient = new Resend(config.email.apiKey)
  return resendClient
}

export async function sendOTPCodeEmail({ email, otp }: { email: string; otp: string }) {
  const html = React.createElement(OTPEmail, { otp })

  return await getResendClient().emails.send({
    from: config.email.from,
    to: email,
    subject: "Your TaxHacker verification code",
    react: html,
  })
}

export async function sendNewsletterWelcomeEmail(email: string) {
  const html = React.createElement(NewsletterWelcomeEmail)

  return await getResendClient().emails.send({
    from: config.email.from,
    to: email,
    subject: "Welcome to TaxHacker Newsletter!",
    react: html,
  })
}
