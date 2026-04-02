import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_ADMIN_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_ADMIN_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const demoSession = request.cookies.get('demo_session')
  const isDemo = demoSession?.value === 'true'

  let user = null
  if (!isDemo) {
    try {
      const { data } = await supabase.auth.getUser()
      user = data.user
    } catch(e) { /* ignore */ }
  }

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login')
  
  if (!user && !isDemo && !isAuthRoute && request.nextUrl.pathname !== '/') {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Si hay usuario y visita /login o /, lo mandamos al dashboard
  if ((user || isDemo) && (request.nextUrl.pathname === '/' || isAuthRoute)) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
