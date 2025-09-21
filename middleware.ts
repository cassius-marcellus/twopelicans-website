import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set(name, value, options)
        },
        remove(name: string, options: any) {
          response.cookies.delete(name)
        }
      }
    }
  )

  // Check auth for protected routes
  const path = request.nextUrl.pathname

  // Protected routes
  const protectedPaths = ['/portal/dashboard', '/portal/admin']
  const isProtectedPath = protectedPaths.some(p => path.startsWith(p))

  if (isProtectedPath) {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      // Redirect to login if not authenticated
      const redirectUrl = new URL('/portal', request.url)
      return NextResponse.redirect(redirectUrl)
    }

    // Check admin access
    if (path.startsWith('/portal/admin')) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'admin') {
        // Redirect to dashboard if not admin
        const redirectUrl = new URL('/portal/dashboard', request.url)
        return NextResponse.redirect(redirectUrl)
      }
    }
  }

  return response
}

export const config = {
  matcher: ['/portal/:path*']
}