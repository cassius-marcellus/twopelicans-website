import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Leading the{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                AI Revolution
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              TwoPelicans AI is at the forefront of enterprise AI transformation, 
              combining deep technical expertise with strategic business acumen to 
              deliver solutions that matter.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
                <p className="text-muted-foreground">
                  To democratize artificial intelligence for enterprises, making advanced AI 
                  capabilities accessible, practical, and transformative. We bridge the gap 
                  between cutting-edge AI research and real-world business applications.
                </p>
              </div>
              <div>
                <h2 className="mb-4 text-3xl font-bold">Our Vision</h2>
                <p className="text-muted-foreground">
                  A future where every enterprise harnesses the full potential of AI to 
                  innovate, compete, and create value. We envision AI as a collaborative 
                  partner that augments human intelligence and drives sustainable growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Core Values</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Integrity</h3>
                <p className="text-muted-foreground">
                  We build trust through transparency, ethical AI practices, and unwavering commitment to our clients&apos; success.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900">
                  <svg className="h-8 w-8 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Innovation</h3>
                <p className="text-muted-foreground">
                  We push boundaries, embrace emerging technologies, and continuously evolve to deliver cutting-edge solutions.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                  <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Partnership</h3>
                <p className="text-muted-foreground">
                  We work alongside our clients as true partners, invested in their long-term success and growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Leadership Team</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Experts driving AI innovation and transformation
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400"></div>
                <h3 className="text-xl font-semibold">Ray Khatir</h3>
                <p className="text-sm text-muted-foreground">Co-Founder & CEO</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Visionary leader with 15+ years in AI and enterprise technology. 
                  Former senior roles at leading tech companies, driving AI adoption 
                  across Fortune 500 organizations.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-400"></div>
                <h3 className="text-xl font-semibold">AI Partner</h3>
                <p className="text-sm text-muted-foreground">Co-Founder & CTO</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Technical architect with deep expertise in machine learning and AI systems. 
                  Led breakthrough AI implementations that transformed industry practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Why TwoPelicans AI?</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <div>
                <div className="text-4xl font-bold">500+</div>
                <div className="mt-2 text-blue-100">AI Models Deployed</div>
              </div>
              <div>
                <div className="text-4xl font-bold">50+</div>
                <div className="mt-2 text-blue-100">Enterprise Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold">3x</div>
                <div className="mt-2 text-blue-100">Average ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Ready to Partner with Us?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Let&apos;s explore how we can transform your business together.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  Start the Conversation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}