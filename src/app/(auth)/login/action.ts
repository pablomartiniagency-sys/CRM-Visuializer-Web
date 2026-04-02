'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createAdminServerClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  // --- MODO DEMO BYPASS ---
  // const supabase = await createAdminServerClient()
  // const data = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  // }
  // const { error } = await supabase.auth.signInWithPassword(data)
  // if (error) {
  //   redirect('/login?error=true')
  // }
  
  // Set fake cookie to pass middleware
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  cookieStore.set('demo_session', 'true', { path: '/' })
  
  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
