import { NextResponse } from "next/server"

export async function GET() {
  // Only show debug info in non-production or with a secret query param
  const debugInfo = {
    hasResendKey: !!process.env.RESEND_API_KEY,
    resendKeyLength: process.env.RESEND_API_KEY?.length || 0,
    emailFrom: process.env.EMAIL_FROM || "not set",
    emailTo: process.env.EMAIL_TO || "not set",
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    timestamp: new Date().toISOString()
  }
  
  return NextResponse.json(debugInfo)
}