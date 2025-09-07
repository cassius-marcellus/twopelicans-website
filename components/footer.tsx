import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/50 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              TwoPelicans AI
            </h3>
            <p className="text-sm text-muted-foreground">
              Transforming enterprises with cutting-edge AI solutions and strategic consulting.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Solutions</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">AI Consulting</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">Custom AI Development</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">AI Integration</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">Training & Support</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              {/* <li><Link href="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors">Case Studies</Link></li> */}
              <li><Link href="/insights" className="text-muted-foreground hover:text-foreground transition-colors">Insights</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:hello@twopelicans.ai" className="text-muted-foreground hover:text-foreground transition-colors">hello@twopelicans.ai</a></li>
              <li><a href="https://linkedin.com/company/twopelicans-ai" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a></li>
              <li><a href="https://twitter.com/twopelicansai" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 TwoPelicans AI. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}