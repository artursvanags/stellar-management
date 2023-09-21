import { createMiddlewareClient  } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next()
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareClient ({ req, res })
  // Check if we have a session
  const { data: { session }, error } = await supabase.auth.getSession()

  // Check auth condition
  if (session) return res
  // checks is there is a valid session
  // Authentication successful, forward request to protected route.

  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone()
  redirectUrl.pathname = '/auth/login' // should change to login page?
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
}

// should do per route basis? or just one global middleware?
// it might be better to just do auth directly in the route
// well see...
export const config = {
  matcher: '/dashboard/:path*',
}