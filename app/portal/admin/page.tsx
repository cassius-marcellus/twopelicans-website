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
  CheckIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface ClientAccount {
  email: string
  password: string
  company: string
  createdAt: string
  lastLogin?: string
}

export default function AdminPanel() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [clients, setClients] = useState<ClientAccount[]>([])
  const [showAddClient, setShowAddClient] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [newClient, setNewClient] = useState({
    email: "",
    company: "",
    password: ""
  })

  useEffect(() => {
    // Check admin auth
    const authToken = sessionStorage.getItem("clientAuth")
    if (!authToken) {
      router.push("/portal")
      return
    }

    try {
      const userData = JSON.parse(atob(authToken))
      // Only allow your admin account
      if (userData.email === "ray@twopelicans.ai") {
        setIsAdmin(true)
        loadClients()
      } else {
        router.push("/portal/dashboard")
      }
    } catch {
      router.push("/portal")
    }
  }, [router])

  const loadClients = () => {
    const storedClients = localStorage.getItem("portalClients")
    if (storedClients) {
      setClients(JSON.parse(storedClients))
    } else {
      // Initialize with demo account
      const initialClients = [
        {
          email: "demo@client.com",
          password: "demo2024",
          company: "Demo Corp",
          createdAt: new Date().toISOString()
        }
      ]
      localStorage.setItem("portalClients", JSON.stringify(initialClients))
      setClients(initialClients)
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

  const addClient = () => {
    if (!newClient.email || !newClient.company || !newClient.password) {
      alert("Please fill in all fields")
      return
    }

    const newAccount: ClientAccount = {
      ...newClient,
      createdAt: new Date().toISOString()
    }

    const updatedClients = [...clients, newAccount]
    setClients(updatedClients)
    localStorage.setItem("portalClients", JSON.stringify(updatedClients))

    // Reset form
    setNewClient({ email: "", company: "", password: "" })
    setShowAddClient(false)
  }

  const removeClient = (email: string) => {
    if (confirm("Are you sure you want to remove this client?")) {
      const updatedClients = clients.filter(c => c.email !== email)
      setClients(updatedClients)
      localStorage.setItem("portalClients", JSON.stringify(updatedClients))
    }
  }

  const copyCredentials = (client: ClientAccount) => {
    const credentials = `Portal Access for ${client.company}\n\nURL: https://twopelicans.ai/portal\nEmail: ${client.email}\nPassword: ${client.password}\n\nPlease keep these credentials secure.`
    navigator.clipboard.writeText(credentials)
    setCopied(client.email)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Checking permissions...</div>
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
          <Button
            onClick={() => router.push("/portal/dashboard")}
            variant="outline"
            className="border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
          >
            Back to Dashboard
          </Button>
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
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={addClient}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  Create Account
                </Button>
                <Button
                  onClick={() => {
                    setShowAddClient(false)
                    setNewClient({ email: "", company: "", password: "" })
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
            {clients.map((client) => (
              <div
                key={client.email}
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
                        {client.email === "demo@client.com" && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">DEMO</span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{client.email}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Created: {new Date(client.createdAt).toLocaleDateString()}
                        {client.lastLogin && ` • Last login: ${new Date(client.lastLogin).toLocaleDateString()}`}
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
                    {client.email !== "demo@client.com" && (
                      <Button
                        onClick={() => removeClient(client.email)}
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-2">Quick Setup Instructions</h3>
          <ol className="text-gray-300 space-y-2 text-sm">
            <li>1. Click "Add Client" to create a new account</li>
            <li>2. Enter their email and company name</li>
            <li>3. Generate a secure password or create your own</li>
            <li>4. Click the copy button to get credentials to share</li>
            <li>5. Send the credentials securely to your client</li>
          </ol>
          <p className="text-gray-400 text-sm mt-4">
            Note: Client credentials are stored locally. In production, use a secure database.
          </p>
        </div>
      </div>
    </div>
  )
}