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
      const fromEmail = process.env.EMAIL_FROM || "hello@send.twopelicans.ai"
      const toEmail = process.env.EMAIL_TO || "ray@twopelicans.ai"
      
      console.log("=== Email Configuration ===")
      console.log("API Key exists:", !!process.env.RESEND_API_KEY)
      console.log("API Key length:", process.env.RESEND_API_KEY?.length)
      console.log("From:", fromEmail)
      console.log("To:", toEmail)
      console.log("===========================")
      
      const data = await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `New Inquiry from ${name} at ${company}`,
        html: emailContent,
        replyTo: email,
      })
      
      console.log("Resend API Response:", JSON.stringify(data, null, 2))
      
      // TypeScript-safe response handling
      if (data) {
        // Check for the nested format first
        if ('data' in data && data.data) {
          console.log("Email sent successfully with ID:", data.data.id)
          return NextResponse.json({ success: true, emailId: data.data.id })
        }
        // Check for error
        if ('error' in data && data.error) {
          console.error("Resend API returned error:", data.error)
          throw new Error(`Email send failed: ${JSON.stringify(data.error)}`)
        }
        // Check for direct id (though TypeScript says this shouldn't happen)
        if ('id' in data) {
          const responseWithId = data as unknown as {id: string}
          console.log("Email sent successfully with ID:", responseWithId.id)
          return NextResponse.json({ success: true, emailId: responseWithId.id })
        }
        // If we got here, email was likely sent but response format is unexpected
        console.log("Unexpected Resend response format, but considering successful:", data)
        return NextResponse.json({ success: true })
      } else {
        throw new Error("No response data from Resend")
      }
    } catch (emailError: any) {
      console.error("=== Resend Error Details ===")
      console.error("Error message:", emailError?.message)
      console.error("Error name:", emailError?.name)
      console.error("Full error:", emailError)
      console.error("============================")
      
      // Provide more specific error message based on error type
      let errorMessage = "Failed to send message"
      if (emailError?.message?.includes("domain")) {
        errorMessage = "Email domain verification issue. Please try again later."
      } else if (emailError?.message?.includes("API")) {
        errorMessage = "Email service configuration error. Please contact support."
      }
      
      throw new Error(errorMessage)
    }
  } catch (error: any) {
    console.error("Contact form error:", error)
    const errorMessage = error?.message || "Failed to send message"
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}