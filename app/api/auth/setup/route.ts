import { NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase'

// This endpoint creates the initial admin user
// Only run this ONCE to set up your admin account
export async function POST(request: Request) {
  try {
    const { setupKey } = await request.json()

    // Simple security: require a setup key
    // Change this to something secure or disable after setup
    if (setupKey !== 'twopelicans-setup-2024') {
      return NextResponse.json(
        { error: 'Invalid setup key' },
        { status: 403 }
      )
    }

    const adminClient = createSupabaseAdmin()

    // Check if admin already exists
    const { data: existingProfile } = await adminClient
      .from('profiles')
      .select('id')
      .eq('email', 'ray@twopelicans.ai')
      .single()

    if (existingProfile) {
      return NextResponse.json(
        { error: 'Admin user already exists' },
        { status: 400 }
      )
    }

    // Create admin user
    const { data: adminUser, error: authError } = await adminClient.auth.admin.createUser({
      email: 'ray@twopelicans.ai',
      password: 'admin2024', // Change this immediately after setup!
      email_confirm: true,
      user_metadata: {
        company: 'TwoPelicans AI',
        role: 'admin'
      }
    })

    if (authError) {
      console.error('Admin creation error:', authError)
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    // Update profile to set admin role
    const { error: profileError } = await adminClient
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', adminUser.user.id)

    if (profileError) {
      console.error('Profile update error:', profileError)
    }

    // Create demo client user
    const { data: demoUser, error: demoError } = await adminClient.auth.admin.createUser({
      email: 'demo@client.com',
      password: 'demo2024',
      email_confirm: true,
      user_metadata: {
        company: 'Demo Corp',
        role: 'client'
      }
    })

    if (demoError) {
      console.error('Demo user creation error:', demoError)
    }

    return NextResponse.json({
      message: 'Setup complete! Admin and demo users created.',
      admin: adminUser?.user?.email,
      demo: demoUser?.user?.email,
      important: 'CHANGE YOUR PASSWORD IMMEDIATELY after first login!'
    })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json(
      { error: 'Setup failed' },
      { status: 500 }
    )
  }
}