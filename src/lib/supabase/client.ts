import { createBrowserClient } from '@supabase/ssr'

export function createAdminBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_ADMIN_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_ADMIN_SUPABASE_ANON_KEY!
  )
}

export function createClientBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_CLIENT_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_CLIENT_SUPABASE_ANON_KEY!
  )
}
