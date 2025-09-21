"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LockIcon, UserIcon, ShieldCheckIcon } from "lucide-react"
import { createSupabaseClient } from "@/lib/supabase"

export default function ClientPortalLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createSupabaseClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Login failed")
        setIsLoading(false)
        return
      }

      // Redirect based on role
      if (data.user.role === 'admin') {
        router.push("/portal/admin")
      } else {
        router.push("/portal/dashboard")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/50 via-black/50 to-gray-900/50 opacity-20"></div>

      <div className="w-full max-w-md relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>

        <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4">
              <ShieldCheckIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Client Portal</h1>
            <p className="text-gray-400">Secure access to your AI resources</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-gray-300 flex items-center gap-2 mb-2">
                <UserIcon className="w-4 h-4" />
                Email Address
              </Label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                placeholder="your@email.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300 flex items-center gap-2 mb-2">
                <LockIcon className="w-4 h-4" />
                Password
              </Label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-center text-gray-400 text-sm">
              Secure authentication powered by Supabase
            </p>
          </div>

          <div className="mt-4 text-center">
            <a href="/" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
              ← Back to main site
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}