"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const form = e.currentTarget
    const formData = new FormData(form)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      role: formData.get("role"),
      projectType: formData.get("projectType"),
      timeline: formData.get("timeline"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      
      if (response.ok && result.success) {
        setSubmitStatus("success")
        form.reset()
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Let&apos;s Build Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                AI Future Together
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Ready to transform your business with AI? Tell us about your project 
              and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-cyan-600 to-purple-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      placeholder="John Smith"
                      className="bg-white/5 border-white/10 focus:border-cyan-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      className="bg-white/5 border-white/10 focus:border-cyan-500/50"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      name="company"
                      required
                      placeholder="Acme Corp"
                      className="bg-white/5 border-white/10 focus:border-cyan-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role</Label>
                    <Input
                      id="role"
                      name="role"
                      placeholder="CTO"
                      className="bg-white/5 border-white/10 focus:border-cyan-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type *</Label>
                  <Select name="projectType" required>
                    <SelectTrigger className="bg-white/5 border-white/10 focus:border-cyan-500/50">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consulting">AI Strategy Consulting</SelectItem>
                      <SelectItem value="development">Custom AI Development</SelectItem>
                      <SelectItem value="integration">AI Integration</SelectItem>
                      <SelectItem value="training">Training & Workshops</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Select name="timeline">
                    <SelectTrigger className="bg-white/5 border-white/10 focus:border-cyan-500/50">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (&lt; 1 month)</SelectItem>
                      <SelectItem value="1-3months">1-3 months</SelectItem>
                      <SelectItem value="3-6months">3-6 months</SelectItem>
                      <SelectItem value="6-12months">6-12 months</SelectItem>
                      <SelectItem value="over-12months">More than 12 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Project Details *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us about your project, challenges, and goals..."
                    className="bg-white/5 border-white/10 focus:border-cyan-500/50"
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="rounded-lg bg-green-500/10 border border-green-500/50 p-4 text-green-400">
                    Thank you for your inquiry! We&apos;ll get back to you within 24 hours.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="rounded-lg bg-red-500/10 border border-red-500/50 p-4 text-red-400">
                    Something went wrong. Please try again or email us directly at hello@twopelicans.ai
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
                >
                  {isSubmitting ? "Sending..." : "Send Inquiry"}
                </Button>
              </form>
            </div>

            {/* Response Time Info */}
            <div className="mt-12 mx-auto max-w-md">
              <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6 text-center">
                <h3 className="mb-2 text-lg font-semibold">Response Time</h3>
                <p className="text-sm text-muted-foreground">
                  We typically respond within 24 hours during business days. 
                  For urgent matters, please indicate in your message.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}