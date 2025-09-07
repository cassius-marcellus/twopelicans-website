import { getBlogPost, blogPosts, getRecentPosts } from "@/lib/blog-data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, User, Tag, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  const recentPosts = getRecentPosts(3).filter(p => p.id !== post.id)

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <Link href="/blog">
              <Button variant="ghost" className="mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Button>
            </Link>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-muted-foreground">
                {post.category}
              </span>
              {post.featured && (
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
                <span className="text-xs">• {post.authorRole}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-cyan-600 to-purple-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-invert prose-lg max-w-none">
              <div 
                className="
                  prose-headings:font-bold 
                  prose-h1:text-3xl prose-h1:mb-8 prose-h1:mt-12
                  prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:text-cyan-400
                  prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-blue-400
                  prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                  prose-strong:text-white prose-strong:font-semibold
                  prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                  prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                  prose-li:text-gray-300 prose-li:mb-2
                  prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:pl-6 prose-blockquote:italic
                  prose-code:text-cyan-400 prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
                "
                dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(post.content) }}
              />
            </div>
            
            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-muted-foreground hover:bg-white/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-gray-950 to-black">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              <div className="grid gap-8 md:grid-cols-3">
                {recentPosts.map((relatedPost) => (
                  <article 
                    key={relatedPost.id}
                    className="group rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:bg-white/10 hover:border-cyan-500/50 transition-all"
                  >
                    <div className="mb-4">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-white/10 text-muted-foreground">
                        {relatedPost.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-cyan-400 transition-colors">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Link 
                      href={`/blog/${relatedPost.slug}`}
                      className="text-cyan-400 hover:text-cyan-300 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      Read More <ArrowRight className="h-3 w-3" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-purple-900/50 via-cyan-900/50 to-blue-900/50 py-16 backdrop-blur border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to Start Your AI Journey?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Let&apos;s discuss how we can help transform your business with AI.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
                >
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Simple markdown to HTML converter
function convertMarkdownToHtml(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Lists
    .replace(/^\* (.+)$/gim, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gim, '<li>$1</li>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    // Line breaks
    .replace(/\n/g, '<br>')
    
  // Wrap lists
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
  
  // Wrap in paragraph tags
  if (!html.startsWith('<')) {
    html = '<p>' + html + '</p>'
  }
  
  return html
}