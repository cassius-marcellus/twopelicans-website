"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  UserPlusIcon,
  TrashIcon,
  CopyIcon,
  RefreshCwIcon,
  ShieldCheckIcon,
  KeyIcon,
  MailIcon,
  BuildingIcon,
  CheckIcon,
  LoaderIcon,
  LogOutIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { createSupabaseClient } from "@/lib/supabase"
import type { Profile } from "@/lib/supabase"

export default function AdminPanel() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [clients, setClients] = useState<Profile[]>([])
  const [showAddClient, setShowAddClient] = useState(false)
  const [addingClient, setAddingClient] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [newClient, setNewClient] = useState({
    email: "",
    company: "",
    password: ""
  })

  const supabase = createSupabaseClient()

  useEffect(() => {
    checkAdminAccess()
  }, [router])

  const checkAdminAccess = async () => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push("/portal")
        return
      }

      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!profile || profile.role !== 'admin') {
        router.push("/portal/dashboard")
        return
      }

      setCurrentUser(profile)
      setIsAdmin(true)
      await loadClients()
    } catch (error) {
      console.error('Access check error:', error)
      router.push("/portal")
    } finally {
      setLoading(false)
    }
  }

  const loadClients = async () => {
    try {
      const response = await fetch('/api/auth/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.ok) {
        const data = await response.json()
        // Filter out admin users from the client list
        setClients(data.filter((user: Profile) => user.role !== 'admin'))
      }
    } catch (error) {
      console.error('Failed to load clients:', error)
    }
  }

  const generatePassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#"
    let password = ""
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewClient({ ...newClient, password })
  }

  const addClient = async () => {
    if (!newClient.email || !newClient.company || !newClient.password) {
      setError("Please fill in all fields")
      return
    }

    setAddingClient(true)
    setError("")

    try {
      const response = await fetch('/api/auth/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newClient.email,
          company: newClient.company,
          password: newClient.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to create user")
        return
      }

      // Reload clients list
      await loadClients()

      // Reset form
      setNewClient({ email: "", company: "", password: "" })
      setShowAddClient(false)
    } catch (error) {
      setError("Failed to create user. Please try again.")
    } finally {
      setAddingClient(false)
    }
  }

  const removeClient = async (userId: string, email: string) => {
    if (!confirm(`Are you sure you want to remove ${email}?`)) {
      return
    }

    try {
      const response = await fetch(`/api/auth/users?id=${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.ok) {
        await loadClients()
      } else {
        alert("Failed to remove client")
      }
    } catch (error) {
      alert("Failed to remove client")
    }
  }

  const copyCredentials = (client: Profile, tempPassword?: string) => {
    const credentials = `Portal Access for ${client.company}

URL: https://twopelicans.ai/portal
Email: ${client.email}
${tempPassword ? `Password: ${tempPassword}` : 'Password: [Use existing password]'}

Please keep these credentials secure and change your password after first login.`

    navigator.clipboard.writeText(credentials)
    setCopied(client.email)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/portal")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center">
        <LoaderIcon className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Access denied</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Client Portal Admin</h1>
            <p className="text-gray-400">Manage client access to the portal</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => router.push("/portal/dashboard")}
              variant="outline"
              className="border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
            >
              View as Client
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <UserPlusIcon className="w-8 h-8 text-cyan-400" />
              <span className="text-3xl font-bold text-white">{clients.length}</span>
            </div>
            <p className="text-gray-300 font-medium">Active Clients</p>
            <p className="text-gray-500 text-sm">Total portal users</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <ShieldCheckIcon className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold text-white">Secure</span>
            </div>
            <p className="text-gray-300 font-medium">Supabase Auth</p>
            <p className="text-gray-500 text-sm">Enterprise security</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <MailIcon className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-white">Active</span>
            </div>
            <p className="text-gray-300 font-medium">Message System</p>
            <p className="text-gray-500 text-sm">Email notifications</p>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-white/10 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Client Accounts</h2>
            <Button
              onClick={() => setShowAddClient(!showAddClient)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              <UserPlusIcon className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </div>

          {showAddClient && (
            <div className="bg-gray-800/50 rounded-lg border border-cyan-500/30 p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">New Client Account</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-gray-300 flex items-center gap-2 mb-2">
                    <MailIcon className="w-4 h-4" />
                    Email Address
                  </Label>
                  <input
                    id="email"
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="client@company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-gray-300 flex items-center gap-2 mb-2">
                    <BuildingIcon className="w-4 h-4" />
                    Company Name
                  </Label>
                  <input
                    id="company"
                    type="text"
                    value={newClient.company}
                    onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="Acme Corporation"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="password" className="text-gray-300 flex items-center gap-2 mb-2">
                    <KeyIcon className="w-4 h-4" />
                    Password
                  </Label>
                  <div className="flex gap-2">
                    <input
                      id="password"
                      type="text"
                      value={newClient.password}
                      onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                      className="flex-1 px-4 py-2 bg-gray-900/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                      placeholder="Enter or generate password"
                    />
                    <Button
                      onClick={generatePassword}
                      variant="outline"
                      className="border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                    >
                      <RefreshCwIcon className="w-4 h-4 mr-2" />
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={addClient}
                  disabled={addingClient}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  {addingClient ? "Creating..." : "Create Account"}
                </Button>
                <Button
                  onClick={() => {
                    setShowAddClient(false)
                    setNewClient({ email: "", company: "", password: "" })
                    setError("")
                  }}
                  variant="outline"
                  className="border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {clients.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No clients yet. Add your first client above!</p>
              </div>
            ) : (
              clients.map((client) => (
                <div
                  key={client.id}
                  className="bg-gray-800/30 rounded-lg border border-white/10 p-4 hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                        <ShieldCheckIcon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-white font-semibold">{client.company}</p>
                          {!client.is_active && (
                            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">INACTIVE</span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">{client.email}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          Created: {new Date(client.created_at).toLocaleDateString()}
                          {client.last_login && ` • Last login: ${new Date(client.last_login).toLocaleDateString()}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => copyCredentials(client)}
                        size="sm"
                        variant="ghost"
                        className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                      >
                        {copied === client.email ? (
                          <CheckIcon className="w-4 h-4" />
                        ) : (
                          <CopyIcon className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        onClick={() => removeClient(client.id, client.email)}
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-2">Portal Management</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>✓ Add new clients with secure passwords</li>
            <li>✓ Copy credentials to share securely</li>
            <li>✓ Remove client access when needed</li>
            <li>✓ Monitor last login times</li>
            <li>✓ All data synced with Supabase database</li>
          </ul>
          <p className="text-gray-400 text-sm mt-4">
            <strong>Security:</strong> Passwords are hashed with bcrypt. Never share passwords in plain text.
          </p>
        </div>
      </div>
    </div>
  )
}