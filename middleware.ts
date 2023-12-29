import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // if user is signed in and the current path is / redirect the user to /account
  if (user && (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/generate', req.url))
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && (req.nextUrl.pathname !== '/' && req.nextUrl.pathname !== '/login' && req.nextUrl.pathname !== '/signup' && req.nextUrl.pathname !== '/auth/login' && req.nextUrl.pathname !== '/auth/logout' && req.nextUrl.pathname !== '/auth/sign-up')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}