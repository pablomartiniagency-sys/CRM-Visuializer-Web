import { createBrowserClient } from '@supabase/ssr'

export function createAdminBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_ADMIN_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_ADMIN_SUPABASE_ANON_KEY || 'placeholder_key'
  )
}

export function createClientBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_CLIENT_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_CLIENT_SUPABASE_ANON_KEY || 'placeholder_key'
  )
}
