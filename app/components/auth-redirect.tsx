'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthRedirect() {
  const router = useRouter()
  const hasProcessed = useRef(false)

  useEffect(() => {
    // Check if this is a password reset link
    if (typeof window !== 'undefined' && !hasProcessed.current) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = hashParams.get('access_token')
      const type = hashParams.get('type')
      const error = hashParams.get('error')

      // If there's an error in the URL, don't process
      if (error) {
        return
      }

      if (accessToken && type === 'recovery') {
        hasProcessed.current = true
        // Use replace instead of push to avoid history issues
        router.replace(`/portal/reset-password${window.location.hash}`)
      }
    }
  }, [router])

  return null
}