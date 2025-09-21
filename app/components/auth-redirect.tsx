'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Check if this is a password reset link
    if (typeof window !== 'undefined') {
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = hashParams.get('access_token')
      const type = hashParams.get('type')

      if (accessToken && type === 'recovery') {
        // Redirect to password reset page with the token
        router.push(`/portal/reset-password${window.location.hash}`)
      }
    }
  }, [router])

  return null
}