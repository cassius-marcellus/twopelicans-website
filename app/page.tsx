import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Transform Your Enterprise with{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Intelligent AI Solutions
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              TwoPelicans AI partners with forward-thinking enterprises to implement 
              cutting-edge artificial intelligence that drives measurable business outcomes. 
              From strategy to deployment, we&apos;re your trusted AI transformation partner.
            </p>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all">
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-cyan-600 to-purple-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-600 to-blue-600 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Leading Enterprises Choose TwoPelicans AI
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We deliver comprehensive AI solutions that transform operations and create competitive advantages
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-6xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 hover:bg-white/10 hover:border-cyan-500/50 transition-all group">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all">
                  <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Strategic AI Consulting</h3>
                <p className="text-muted-foreground">
                  Develop a comprehensive AI strategy aligned with your business objectives. 
                  We identify high-impact opportunities and create actionable roadmaps for AI adoption.
                </p>
              </div>
              
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 hover:bg-white/10 hover:border-cyan-500/50 transition-all group">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 group-hover:from-cyan-500/30 group-hover:to-purple-600/30 transition-all">
                  <svg className="h-6 w-6 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Custom AI Development</h3>
                <p className="text-muted-foreground">
                  Build tailored AI solutions designed specifically for your unique challenges. 
                  From NLP to computer vision, we develop and deploy production-ready AI systems.
                </p>
              </div>
              
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 hover:bg-white/10 hover:border-cyan-500/50 transition-all group">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-600/20 group-hover:from-purple-500/30 group-hover:to-pink-600/30 transition-all">
                  <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Seamless Integration</h3>
                <p className="text-muted-foreground">
                  Integrate AI capabilities into your existing infrastructure with minimal disruption. 
                  We ensure smooth deployment and provide ongoing support for optimal performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-gradient-to-r from-purple-900/50 via-cyan-900/50 to-blue-900/50 py-16 backdrop-blur border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">150+</div>
              <div className="mt-2 text-gray-400">AI Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">40%</div>
              <div className="mt-2 text-gray-400">Average Cost Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">98%</div>
              <div className="mt-2 text-gray-400">Client Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our AI Solutions Portfolio
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive AI services tailored to enterprise needs
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur p-8 hover:bg-white/10 hover:border-cyan-500/50 transition-all">
              <h3 className="text-xl font-semibold mb-3">Generative AI & LLMs</h3>
              <p className="text-muted-foreground mb-4">
                Harness the power of large language models for content generation, automation, and intelligent assistants.
              </p>
              <Link href="/services" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Learn more →
              </Link>
            </div>
            
            <div className="group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur p-8 hover:bg-white/10 hover:border-cyan-500/50 transition-all">
              <h3 className="text-xl font-semibold mb-3">Predictive Analytics</h3>
              <p className="text-muted-foreground mb-4">
                Transform data into actionable insights with advanced machine learning models for forecasting and optimization.
              </p>
              <Link href="/services" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Learn more →
              </Link>
            </div>
            
            <div className="group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur p-8 hover:bg-white/10 hover:border-cyan-500/50 transition-all">
              <h3 className="text-xl font-semibold mb-3">Process Automation</h3>
              <p className="text-muted-foreground mb-4">
                Streamline operations with intelligent automation that reduces costs and improves efficiency.
              </p>
              <Link href="/services" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Learn more →
              </Link>
            </div>
            
            <div className="group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur p-8 hover:bg-white/10 hover:border-cyan-500/50 transition-all">
              <h3 className="text-xl font-semibold mb-3">Computer Vision</h3>
              <p className="text-muted-foreground mb-4">
                Deploy visual AI for quality control, security, and advanced image analysis applications.
              </p>
              <Link href="/services" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-b from-gray-950 to-black py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Let&apos;s discuss how AI can drive growth and innovation in your organization.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all">
                  Schedule Free Consultation
                </Button>
              </Link>
              <Link href="/insights">
                <Button size="lg" variant="outline">
                  Read Our Insights
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}