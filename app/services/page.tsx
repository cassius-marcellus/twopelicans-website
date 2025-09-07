"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Brain, 
  Code2, 
  Cpu, 
  LineChart, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle2
} from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Brain,
      title: "AI Strategy Consulting",
      description: "Transform your business with a comprehensive AI roadmap tailored to your industry and objectives.",
      features: [
        "AI readiness assessment",
        "Strategic roadmap development",
        "ROI analysis and projections",
        "Technology stack recommendations",
        "Change management planning"
      ],
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: Code2,
      title: "Custom AI Development",
      description: "Build bespoke AI solutions that solve your unique business challenges with cutting-edge technology.",
      features: [
        "Natural Language Processing (NLP)",
        "Computer Vision applications",
        "Predictive analytics models",
        "Recommendation systems",
        "Anomaly detection systems"
      ],
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Cpu,
      title: "Generative AI & LLMs",
      description: "Harness the power of large language models and generative AI for content, automation, and insights.",
      features: [
        "Custom GPT implementations",
        "Intelligent document processing",
        "Automated content generation",
        "Conversational AI assistants",
        "Code generation tools"
      ],
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Zap,
      title: "Process Automation",
      description: "Streamline operations and reduce costs with intelligent automation powered by AI.",
      features: [
        "Robotic Process Automation (RPA)",
        "Workflow optimization",
        "Intelligent data extraction",
        "Automated decision-making",
        "Quality assurance automation"
      ],
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: LineChart,
      title: "Data Analytics & BI",
      description: "Transform raw data into actionable insights with advanced analytics and visualization.",
      features: [
        "Real-time analytics dashboards",
        "Predictive forecasting",
        "Customer behavior analysis",
        "Market trend analysis",
        "Performance optimization"
      ],
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Shield,
      title: "AI Governance & Ethics",
      description: "Ensure responsible AI deployment with robust governance frameworks and ethical guidelines.",
      features: [
        "Bias detection and mitigation",
        "Compliance frameworks",
        "Transparency protocols",
        "Risk assessment",
        "Ethical AI guidelines"
      ],
      color: "from-red-500 to-rose-600"
    }
  ]

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We analyze your business needs, challenges, and opportunities to identify high-impact AI use cases."
    },
    {
      step: "02",
      title: "Strategy",
      description: "Develop a comprehensive AI strategy aligned with your business goals and technical requirements."
    },
    {
      step: "03",
      title: "Development",
      description: "Build and train custom AI models using state-of-the-art techniques and your specific data."
    },
    {
      step: "04",
      title: "Integration",
      description: "Seamlessly integrate AI solutions into your existing systems with minimal disruption."
    },
    {
      step: "05",
      title: "Optimization",
      description: "Continuously monitor, refine, and optimize AI performance for maximum business impact."
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Enterprise AI Services{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                That Deliver Results
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              From strategy to implementation, we provide end-to-end AI solutions 
              that transform your business operations and drive competitive advantage.
            </p>
            <div className="mt-10">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
                >
                  Start Your AI Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-cyan-600 to-purple-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Core Services</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive AI solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div 
                  key={index}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 hover:bg-white/10 hover:border-cyan-500/50 transition-all"
                >
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-30 transition-opacity`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Proven Process</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A systematic approach to AI transformation
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <div 
                key={index} 
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {index < process.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-transparent"></div>
                )}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                  <span className="text-sm font-bold">{item.step}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Industries We Serve</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Proven expertise across diverse sectors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              "Financial Services",
              "Healthcare",
              "Retail & E-commerce",
              "Manufacturing",
              "Technology",
              "Energy & Utilities",
              "Transportation",
              "Government"
            ].map((industry, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 transition-all"
              >
                <p className="font-medium">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-purple-900/50 via-cyan-900/50 to-blue-900/50 py-16 backdrop-blur border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Let&apos;s discuss how our AI services can drive innovation and growth for your organization.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
                >
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/insights">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white/20 hover:bg-white/10"
                >
                  Explore Our Insights
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}