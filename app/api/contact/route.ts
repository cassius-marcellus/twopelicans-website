import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, role, projectType, timeline, message } = body

    console.log("Contact form submission received:", { name, email, company })

    // Format the email content
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Role:</strong> ${role || "Not specified"}</p>
      
      <h3>Project Details</h3>
      <p><strong>Project Type:</strong> ${projectType}</p>
      <p><strong>Timeline:</strong> ${timeline || "Not specified"}</p>
      
      <h3>Message</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `

    // If RESEND_API_KEY is not set, log to console (for development)
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "your_resend_api_key_here") {
      console.log("=== Contact Form Submission (Email not configured) ===")
      console.log("From:", name, `<${email}>`)
      console.log("Company:", company)
      console.log("Project Type:", projectType)
      console.log("Message:", message)
      console.log("=====================================================")
      
      // Still return success for development
      return NextResponse.json({ 
        success: true, 
        message: "Form received (email not configured - logged to console)" 
      })
    }

    // Send email using Resend
    try {
      console.log("Attempting to send email via Resend...")
      console.log("From:", process.env.EMAIL_FROM || "onboarding@resend.dev")
      console.log("To:", process.env.EMAIL_TO || "hello@twopelicans.ai")
      
      const data = await resend.emails.send({
        from: process.env.EMAIL_FROM || "onboarding@resend.dev",
        to: process.env.EMAIL_TO || "hello@twopelicans.ai",
        subject: `New Inquiry from ${name} at ${company}`,
        html: emailContent,
        replyTo: email,
      })
      
      console.log("Email sent successfully:", data)
      
      // Resend returns an object with an id property on success
      if (data && data.id) {
        return NextResponse.json({ success: true, emailId: data.id })
      } else if (data) {
        // If data exists but no id, still consider it successful
        return NextResponse.json({ success: true })
      } else {
        throw new Error("Email send failed")
      }
    } catch (emailError) {
      console.error("Resend error:", emailError)
      throw emailError
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    )
  }
}