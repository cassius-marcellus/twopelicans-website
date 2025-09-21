"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  FileTextIcon,
  DownloadIcon,
  CalendarIcon,
  MessageSquareIcon,
  ChartBarIcon,
  BookOpenIcon,
  LogOutIcon,
  UserIcon,
  BrainCircuitIcon,
  RocketIcon,
  ShieldCheckIcon,
  SendIcon,
  InboxIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface UserData {
  email: string
  company: string
}

interface Message {
  id: string
  subject: string
  content: string
  sender: string
  timestamp: string
  isRead: boolean
  type: 'sent' | 'received'
}

export default function ClientDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [activeSection, setActiveSection] = useState("overview")
  const [messages, setMessages] = useState<Message[]>([])
  const [showCompose, setShowCompose] = useState(false)
  const [messageForm, setMessageForm] = useState({ subject: "", content: "" })
  const [sendingMessage, setSendingMessage] = useState(false)

  useEffect(() => {
    const authToken = sessionStorage.getItem("clientAuth")
    if (!authToken) {
      router.push("/portal")
      return
    }

    try {
      const userData = JSON.parse(atob(authToken)) as UserData
      setUser(userData)

      // Load messages from localStorage
      const savedMessages = localStorage.getItem(`messages_${userData.email}`)
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages))
      }
    } catch {
      router.push("/portal")
    }
  }, [router])

  const handleSendMessage = async () => {
    if (!messageForm.subject || !messageForm.content || !user) return

    setSendingMessage(true)

    try {
      const response = await fetch('/api/portal-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: messageForm.subject,
          message: messageForm.content,
          clientEmail: user.email,
          clientCompany: user.company
        })
      })

      if (response.ok) {
        const newMessage: Message = {
          id: Date.now().toString(),
          subject: messageForm.subject,
          content: messageForm.content,
          sender: user.company,
          timestamp: new Date().toISOString(),
          isRead: true,
          type: 'sent'
        }

        const updatedMessages = [...messages, newMessage]
        setMessages(updatedMessages)
        localStorage.setItem(`messages_${user.email}`, JSON.stringify(updatedMessages))

        setMessageForm({ subject: "", content: "" })
        setShowCompose(false)
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      alert('Failed to send message. Please try again.')
    } finally {
      setSendingMessage(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("clientAuth")
    router.push("/portal")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const resources = [
    {
      title: "AI Implementation Roadmap",
      type: "PDF",
      size: "2.4 MB",
      date: "2024-01-15",
      icon: FileTextIcon,
      description: "Your customized AI adoption strategy"
    },
    {
      title: "Q4 2023 Progress Report",
      type: "PDF",
      size: "1.8 MB",
      date: "2024-01-10",
      icon: ChartBarIcon,
      description: "Quarterly metrics and achievements"
    },
    {
      title: "Model Training Documentation",
      type: "PDF",
      size: "3.2 MB",
      date: "2024-01-05",
      icon: BookOpenIcon,
      description: "Technical documentation for your custom models"
    },
    {
      title: "Best Practices Guide",
      type: "PDF",
      size: "890 KB",
      date: "2023-12-20",
      icon: BrainCircuitIcon,
      description: "AI integration best practices"
    }
  ]

  const upcomingMeetings = [
    { date: "2024-02-01", time: "10:00 AM EST", topic: "Monthly Review" },
    { date: "2024-02-15", time: "2:00 PM EST", topic: "Technical Deep Dive" },
    { date: "2024-03-01", time: "10:00 AM EST", topic: "Q1 Planning Session" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <ShieldCheckIcon className="w-8 h-8 text-cyan-500" />
            <div>
              <h1 className="text-xl font-bold text-white">Client Portal</h1>
              <p className="text-sm text-gray-400">{user.company}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
          >
            <LogOutIcon className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">{user.company}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection("overview")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                    activeSection === "overview"
                      ? "bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <RocketIcon className="w-5 h-5" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveSection("resources")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                    activeSection === "resources"
                      ? "bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <FileTextIcon className="w-5 h-5" />
                  Resources
                </button>
                <button
                  onClick={() => setActiveSection("meetings")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                    activeSection === "meetings"
                      ? "bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <CalendarIcon className="w-5 h-5" />
                  Meetings
                </button>
                <button
                  onClick={() => setActiveSection("messages")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                    activeSection === "messages"
                      ? "bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <MessageSquareIcon className="w-5 h-5" />
                  Messages
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Welcome back!</h2>
                  <p className="text-gray-400">Here's your AI project overview</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <ChartBarIcon className="w-8 h-8 text-cyan-400" />
                      <span className="text-2xl font-bold text-white">87%</span>
                    </div>
                    <p className="text-gray-300 font-medium">Project Progress</p>
                    <p className="text-gray-500 text-sm mt-1">Phase 2 of 3</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/20 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <BrainCircuitIcon className="w-8 h-8 text-purple-400" />
                      <span className="text-2xl font-bold text-white">3</span>
                    </div>
                    <p className="text-gray-300 font-medium">Active Models</p>
                    <p className="text-gray-500 text-sm mt-1">All performing well</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/20 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <RocketIcon className="w-8 h-8 text-green-400" />
                      <span className="text-2xl font-bold text-white">+42%</span>
                    </div>
                    <p className="text-gray-300 font-medium">Efficiency Gain</p>
                    <p className="text-gray-500 text-sm mt-1">This quarter</p>
                  </div>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-white/10 p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-gray-300">Model training completed for customer segmentation</p>
                        <p className="text-gray-500 text-sm">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-gray-300">New documentation uploaded: API Integration Guide</p>
                        <p className="text-gray-500 text-sm">5 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-gray-300">Q4 2023 review meeting completed</p>
                        <p className="text-gray-500 text-sm">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "resources" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Resources & Documents</h2>
                  <p className="text-gray-400">Download your project files and documentation</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource, index) => (
                    <div
                      key={index}
                      className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all">
                            <resource.icon className="w-6 h-6 text-cyan-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-semibold mb-1">{resource.title}</h3>
                            <p className="text-gray-500 text-sm mb-2">{resource.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span>{resource.type}</span>
                              <span>{resource.size}</span>
                              <span>{resource.date}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                        >
                          <DownloadIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "meetings" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Upcoming Meetings</h2>
                  <p className="text-gray-400">Your scheduled sessions with our team</p>
                </div>

                <div className="space-y-4">
                  {upcomingMeetings.map((meeting, index) => (
                    <div
                      key={index}
                      className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-cyan-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                            <CalendarIcon className="w-6 h-6 text-cyan-400" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{meeting.topic}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                              <span>{meeting.date}</span>
                              <span>{meeting.time}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                        >
                          Join Meeting
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-2">Need to schedule a meeting?</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Contact your account manager to schedule additional sessions
                  </p>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    Request Meeting
                  </Button>
                </div>
              </div>
            )}

            {activeSection === "messages" && (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Messages</h2>
                    <p className="text-gray-400">Communication with your TwoPelicans team</p>
                  </div>
                  <Button
                    onClick={() => setShowCompose(!showCompose)}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  >
                    <SendIcon className="w-4 h-4 mr-2" />
                    New Message
                  </Button>
                </div>

                {showCompose && (
                  <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-cyan-500/30 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Compose Message</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="subject" className="text-gray-300 block mb-2">
                          Subject
                        </Label>
                        <input
                          id="subject"
                          type="text"
                          value={messageForm.subject}
                          onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                          placeholder="What's this about?"
                        />
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-gray-300 block mb-2">
                          Message
                        </Label>
                        <textarea
                          id="message"
                          value={messageForm.content}
                          onChange={(e) => setMessageForm({ ...messageForm, content: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 min-h-[150px] resize-none"
                          placeholder="Type your message here..."
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button
                          onClick={handleSendMessage}
                          disabled={sendingMessage || !messageForm.subject || !messageForm.content}
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                        >
                          {sendingMessage ? "Sending..." : "Send Message"}
                        </Button>
                        <Button
                          onClick={() => {
                            setShowCompose(false)
                            setMessageForm({ subject: "", content: "" })
                          }}
                          variant="outline"
                          className="border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((message) => (
                      <div
                        key={message.id}
                        className={`bg-gray-900/50 backdrop-blur-xl rounded-xl border ${
                          message.type === 'sent' ? 'border-cyan-500/20' : 'border-purple-500/20'
                        } p-6 hover:border-cyan-500/30 transition-all`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              message.type === 'sent'
                                ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20'
                                : 'bg-gradient-to-br from-purple-500/20 to-pink-600/20'
                            }`}>
                              {message.type === 'sent' ? (
                                <SendIcon className="w-5 h-5 text-cyan-400" />
                              ) : (
                                <InboxIcon className="w-5 h-5 text-purple-400" />
                              )}
                            </div>
                            <div>
                              <h4 className="text-white font-semibold">{message.subject}</h4>
                              <p className="text-gray-400 text-sm">
                                {message.type === 'sent' ? 'To: TwoPelicans Team' : `From: ${message.sender}`}
                              </p>
                            </div>
                          </div>
                          <span className="text-gray-500 text-sm">
                            {new Date(message.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-gray-300 whitespace-pre-wrap pl-13">
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-white/10 p-8 text-center">
                    <MessageSquareIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
                    <p className="text-gray-400">Start a conversation with your TwoPelicans team</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}