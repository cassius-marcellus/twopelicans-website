import Link from "next/link"
import { Button } from "@/components/ui/button"

const insights = [
  {
    id: 1,
    title: "The Future of Generative AI in Enterprise Operations",
    excerpt: "Exploring how large language models are revolutionizing business processes, from customer service to internal documentation.",
    category: "Generative AI",
    readTime: "8 min read",
    date: "December 15, 2024",
    featured: true,
  },
  {
    id: 2,
    title: "Building Responsible AI: A Framework for Ethical Implementation",
    excerpt: "Best practices for ensuring AI systems are fair, transparent, and aligned with organizational values.",
    category: "AI Ethics",
    readTime: "6 min read",
    date: "December 10, 2024",
    featured: true,
  },
  {
    id: 3,
    title: "ROI of AI: Measuring Success in Digital Transformation",
    excerpt: "Key metrics and methodologies for quantifying the business impact of AI initiatives.",
    category: "Strategy",
    readTime: "10 min read",
    date: "December 5, 2024",
    featured: true,
  },
  {
    id: 4,
    title: "Computer Vision in Manufacturing: Quality Control Revolution",
    excerpt: "Case studies demonstrating how visual AI is transforming quality assurance and reducing defects.",
    category: "Computer Vision",
    readTime: "7 min read",
    date: "November 28, 2024",
  },
  {
    id: 5,
    title: "NLP Breakthroughs: What They Mean for Your Business",
    excerpt: "Recent advances in natural language processing and their practical applications for enterprises.",
    category: "NLP",
    readTime: "9 min read",
    date: "November 20, 2024",
  },
  {
    id: 6,
    title: "AI-Powered Predictive Maintenance: Reducing Downtime by 40%",
    excerpt: "How machine learning models are preventing equipment failures before they happen.",
    category: "Predictive Analytics",
    readTime: "5 min read",
    date: "November 15, 2024",
  },
]

export default function InsightsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              AI Insights &{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Thought Leadership
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Stay ahead of the curve with expert analysis, industry trends, and practical 
              guidance on implementing AI in your enterprise.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold">Featured Insights</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {insights
              .filter(article => article.featured)
              .map((article) => (
                <article key={article.id} className="group relative rounded-xl border p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-4">
                    <span className="inline-block rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold group-hover:text-blue-600 transition-colors">
                    <Link href={`/insights/${article.id}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-2xl font-bold">Explore by Topic</h2>
            <div className="flex flex-wrap gap-3">
              {["All", "Generative AI", "Computer Vision", "NLP", "Predictive Analytics", "AI Ethics", "Strategy", "Case Studies"].map(
                (category) => (
                  <button
                    key={category}
                    className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {category}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-3xl font-bold">Latest Articles</h2>
            <div className="space-y-8">
              {insights.map((article) => (
                <article key={article.id} className="group border-b pb-8 last:border-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="mb-2">
                        <span className="inline-block rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                          {article.category}
                        </span>
                      </div>
                      <h3 className="mb-2 text-2xl font-semibold group-hover:text-blue-600 transition-colors">
                        <Link href={`/insights/${article.id}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className="mb-4 text-muted-foreground">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-8">
                      <Link href={`/insights/${article.id}`}>
                        <Button variant="outline">Read More →</Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Stay Informed</h2>
            <p className="mt-4 text-blue-100">
              Get the latest AI insights and industry updates delivered to your inbox.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-md bg-white/10 px-4 py-3 text-white placeholder:text-blue-200 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button size="lg" variant="secondary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-3xl font-bold">Resources & Downloads</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border p-6">
                <h3 className="mb-2 text-xl font-semibold">AI Readiness Assessment Guide</h3>
                <p className="mb-4 text-muted-foreground">
                  Evaluate your organization&apos;s preparedness for AI adoption with our comprehensive assessment framework.
                </p>
                <Button variant="outline">Download PDF</Button>
              </div>
              <div className="rounded-xl border p-6">
                <h3 className="mb-2 text-xl font-semibold">2025 Enterprise AI Trends Report</h3>
                <p className="mb-4 text-muted-foreground">
                  Key predictions and strategic insights for AI implementation in the coming year.
                </p>
                <Button variant="outline">Download PDF</Button>
              </div>
              <div className="rounded-xl border p-6">
                <h3 className="mb-2 text-xl font-semibold">ROI Calculator for AI Projects</h3>
                <p className="mb-4 text-muted-foreground">
                  Interactive tool to estimate the potential return on your AI investments.
                </p>
                <Button variant="outline">Access Tool</Button>
              </div>
              <div className="rounded-xl border p-6">
                <h3 className="mb-2 text-xl font-semibold">AI Implementation Playbook</h3>
                <p className="mb-4 text-muted-foreground">
                  Step-by-step guide for successfully deploying AI solutions in your enterprise.
                </p>
                <Button variant="outline">Download PDF</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}