import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { subject, message, clientEmail, clientCompany } = await req.json()

    if (!subject || !message || !clientEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email notification to you
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: `[Client Portal] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0;">New Client Portal Message</h2>
          </div>
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="color: #6b7280; margin: 0 0 5px 0;"><strong>From:</strong></p>
              <p style="color: #111827; margin: 0 0 15px 0;">${clientCompany} (${clientEmail})</p>

              <p style="color: #6b7280; margin: 0 0 5px 0;"><strong>Subject:</strong></p>
              <p style="color: #111827; margin: 0 0 15px 0;">${subject}</p>

              <p style="color: #6b7280; margin: 0 0 5px 0;"><strong>Message:</strong></p>
              <div style="color: #111827; white-space: pre-wrap; line-height: 1.6;">${message}</div>
            </div>

            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px;">
              <p style="color: #92400e; margin: 0; font-size: 14px;">
                <strong>Note:</strong> Reply directly to this email and your response will appear in the client's portal inbox.
              </p>
            </div>
          </div>
          <div style="background: #374151; color: #9ca3af; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px;">
            Sent from TwoPelicans AI Client Portal
          </div>
        </div>
      `,
      replyTo: clientEmail,
    })

    if (error) {
      console.error('Failed to send email:', error)
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }

    // Store message in localStorage (client-side will handle this)
    // In production, you'd store this in a database

    return NextResponse.json({ success: true, messageId: data?.id })
  } catch (error) {
    console.error('Portal message error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to fetch messages (for future implementation)
export async function GET(req: Request) {
  // In production, fetch from database
  // For now, return empty array (client will use localStorage)
  return NextResponse.json({ messages: [] })
}