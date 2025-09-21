import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { createSupabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient()

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get all users
    const { data: users, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return NextResponse.json(users)
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  let createdUserId: string | null = null

  try {
    const supabase = await createSupabaseServerClient()

    // Check if user is authenticated and admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Parse request body
    const { email, password, company, sendWelcomeEmail = false } = await request.json()

    if (!email || !password || !company) {
      return NextResponse.json(
        { error: 'Email, password, and company are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Use admin client to create user
    const adminClient = createSupabaseAdmin()

    // Step 1: Create user in Supabase Auth
    const { data: newUser, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        company,
        role: 'client'
      }
    })

    if (authError) {
      console.error('Auth creation error:', authError)
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    createdUserId = newUser.user.id

    // Step 2: Explicitly create profile (since trigger may not fire for admin-created users)
    const { error: profileError } = await adminClient
      .from('profiles')
      .insert({
        id: newUser.user.id,
        email: newUser.user.email,
        company,
        role: 'client',
        is_active: true
      })

    if (profileError) {
      // If profile creation fails, we need to clean up the auth user
      console.error('Profile creation error:', profileError)

      // Attempt to delete the auth user
      await adminClient.auth.admin.deleteUser(newUser.user.id)

      return NextResponse.json(
        { error: 'Failed to create user profile. User creation rolled back.' },
        { status: 500 }
      )
    }

    // Step 3: Verify both auth and profile exist
    const { data: verifyProfile } = await adminClient
      .from('profiles')
      .select('*')
      .eq('id', newUser.user.id)
      .single()

    if (!verifyProfile) {
      // Clean up if verification fails
      await adminClient.auth.admin.deleteUser(newUser.user.id)

      return NextResponse.json(
        { error: 'User creation verification failed. User creation rolled back.' },
        { status: 500 }
      )
    }

    // Step 4: Test login capability (optional but ensures everything works)
    const { error: loginTestError } = await adminClient.auth.signInWithPassword({
      email,
      password
    })

    if (loginTestError) {
      console.error('Login test failed:', loginTestError)
      // Don't rollback here, just log the warning
      console.warn('Warning: User created but login test failed')
    } else {
      // Sign out after test
      await adminClient.auth.signOut()
    }

    // Step 5: Send welcome email if requested
    if (sendWelcomeEmail) {
      try {
        const emailBody = {
          to: email,
          subject: `Welcome to TwoPelicans AI Portal - ${company}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0891b2;">Welcome to TwoPelicans AI Client Portal</h2>
              <p>Your portal account has been created successfully.</p>
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Portal Access Details:</strong></p>
                <p>URL: <a href="https://twopelicans.ai/portal">https://twopelicans.ai/portal</a></p>
                <p>Email: ${email}</p>
                <p>Company: ${company}</p>
              </div>
              <p><strong>Important:</strong> Your password has been shared separately. Please change it after your first login.</p>
              <p>If you have any questions, please contact your account manager.</p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              <p style="color: #6b7280; font-size: 12px;">TwoPelicans AI - Enterprise AI Solutions</p>
            </div>
          `
        }

        const emailResponse = await fetch(`${process.env.NEXTAUTH_URL || 'https://twopelicans.ai'}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailBody)
        })

        if (!emailResponse.ok) {
          console.warn('Welcome email failed to send')
        }
      } catch (emailError) {
        console.warn('Welcome email error:', emailError)
        // Don't fail the whole operation for email issues
      }
    }

    // Return success with full user details
    return NextResponse.json({
      success: true,
      user: {
        id: newUser.user.id,
        email: newUser.user.email,
        company,
        created: true,
        profileVerified: true,
        loginTestPassed: !loginTestError
      },
      message: 'User created successfully with verified profile'
    })
  } catch (error) {
    console.error('Create user error:', error)

    // Attempt cleanup if we created a user but something else failed
    if (createdUserId) {
      try {
        const adminClient = createSupabaseAdmin()
        await adminClient.auth.admin.deleteUser(createdUserId)
        console.log('Cleaned up partial user creation')
      } catch (cleanupError) {
        console.error('Cleanup failed:', cleanupError)
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createSupabaseServerClient()

    // Check if user is authenticated and admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get user ID from query params
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('id')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    // Use admin client to delete user
    const adminClient = createSupabaseAdmin()

    const { error: deleteError } = await adminClient.auth.admin.deleteUser(userId)

    if (deleteError) {
      console.error('Delete error:', deleteError)
      return NextResponse.json(
        { error: deleteError.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}