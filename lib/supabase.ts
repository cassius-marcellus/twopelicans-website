import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const createSupabaseClient = () => {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Admin client for server-side admin operations (only use in API routes)
export const createSupabaseAdmin = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, supabaseServiceKey)
}

// Types for our portal
export interface Profile {
  id: string
  email: string
  company: string
  role: 'admin' | 'client'
  is_active: boolean
  created_at: string
  updated_at: string
  last_login?: string
}

export interface Message {
  id: string
  user_id: string
  subject: string
  content: string
  sender_name: string
  sender_email: string
  type: 'sent' | 'received'
  is_read: boolean
  created_at: string
}