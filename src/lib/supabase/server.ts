import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Cliente para Base de Datos de Administración (Auth, Tenants, Configuración Global)
export async function createAdminServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_ADMIN_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_ADMIN_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignorado si se llama desde Server Component
          }
        },
      },
    }
  )
}

// Cliente para Base de Datos del Cliente (Business Data: Leads, Accounts, Orders)
// A futuro: La URL y KEY deberían venir del contexto/tenant del usuario en sesión.
export async function createClientServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_CLIENT_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_CLIENT_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignorado si se llama desde Server Component
          }
        },
      },
    }
  )
}
