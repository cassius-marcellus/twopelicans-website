#!/usr/bin/env node

/**
 * Portal Admin CLI - Bulletproof user management for TwoPelicans AI Portal
 *
 * Usage:
 *   node scripts/portal-admin.js create --email user@example.com --company "Company Name" [--password "SecurePass123!"]
 *   node scripts/portal-admin.js list
 *   node scripts/portal-admin.js verify --email user@example.com
 *   node scripts/portal-admin.js delete --email user@example.com
 */

const { createClient } = require('@supabase/supabase-js')
const readline = require('readline')
const crypto = require('crypto')
require('dotenv').config({ path: '.env.local' })

// Verify environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Please ensure .env.local contains:')
  console.error('  - NEXT_PUBLIC_SUPABASE_URL')
  console.error('  - SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// Initialize Supabase admin client
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Utility functions
function generateSecurePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function parseArgs() {
  const args = process.argv.slice(2)
  const command = args[0]
  const options = {}

  for (let i = 1; i < args.length; i += 2) {
    const key = args[i].replace('--', '')
    const value = args[i + 1]
    options[key] = value
  }

  return { command, options }
}

// Command implementations
async function createUser(options) {
  const { email, company, password = generateSecurePassword() } = options

  // Validation
  if (!email || !company) {
    console.error('❌ Email and company are required')
    console.error('Usage: create --email user@example.com --company "Company Name"')
    return
  }

  if (!validateEmail(email)) {
    console.error('❌ Invalid email format')
    return
  }

  if (password.length < 8) {
    console.error('❌ Password must be at least 8 characters')
    return
  }

  console.log('\n📝 Creating Portal User')
  console.log('━'.repeat(50))
  console.log(`Email: ${email}`)
  console.log(`Company: ${company}`)
  console.log(`Password: ${password}`)
  console.log('━'.repeat(50))

  try {
    // Step 1: Check if user already exists
    console.log('\n1️⃣ Checking for existing user...')
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single()

    if (existingProfile) {
      console.error('❌ User already exists with this email')
      return
    }

    // Step 2: Create auth user
    console.log('2️⃣ Creating authentication user...')
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        company,
        role: 'client'
      }
    })

    if (authError) {
      console.error('❌ Auth creation failed:', authError.message)
      return
    }

    console.log('✅ Auth user created:', authUser.user.id)

    // Step 3: Create profile (explicit since trigger may not fire)
    console.log('3️⃣ Creating user profile...')
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authUser.user.id,
        email: authUser.user.email,
        company,
        role: 'client',
        is_active: true
      })

    if (profileError) {
      console.error('❌ Profile creation failed:', profileError.message)
      console.log('🔄 Rolling back auth user...')

      await supabase.auth.admin.deleteUser(authUser.user.id)
      console.log('✅ Rollback complete')
      return
    }

    console.log('✅ Profile created successfully')

    // Step 4: Verify profile exists
    console.log('4️⃣ Verifying profile...')
    const { data: verifyProfile, error: verifyError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.user.id)
      .single()

    if (verifyError || !verifyProfile) {
      console.error('❌ Profile verification failed')
      console.log('🔄 Rolling back...')

      await supabase.auth.admin.deleteUser(authUser.user.id)
      return
    }

    console.log('✅ Profile verified')

    // Step 5: Test login
    console.log('5️⃣ Testing login capability...')
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (loginError) {
      console.warn('⚠️ Login test failed:', loginError.message)
      console.warn('User created but may have login issues')
    } else {
      console.log('✅ Login test successful')
      await supabase.auth.signOut()
    }

    // Success output
    console.log('\n' + '═'.repeat(60))
    console.log('🎉 USER CREATED SUCCESSFULLY')
    console.log('═'.repeat(60))
    console.log('\n📋 Portal Access Credentials:')
    console.log('━'.repeat(50))
    console.log(`URL: https://twopelicans.ai/portal`)
    console.log(`Email: ${email}`)
    console.log(`Password: ${password}`)
    console.log(`Company: ${company}`)
    console.log(`User ID: ${authUser.user.id}`)
    console.log('━'.repeat(50))
    console.log('\n⚠️ Please share these credentials securely')
    console.log('⚠️ User should change password on first login')

  } catch (error) {
    console.error('❌ Unexpected error:', error)
    console.error('Please check your Supabase configuration')
  }
}

async function listUsers() {
  console.log('\n📋 Portal Users')
  console.log('═'.repeat(60))

  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Failed to fetch users:', error.message)
      return
    }

    if (profiles.length === 0) {
      console.log('No users found')
      return
    }

    // Group by role
    const admins = profiles.filter(p => p.role === 'admin')
    const clients = profiles.filter(p => p.role === 'client')

    if (admins.length > 0) {
      console.log('\n👑 Administrators:')
      admins.forEach(admin => {
        console.log(`  • ${admin.email} (${admin.company})`)
      })
    }

    if (clients.length > 0) {
      console.log('\n👤 Clients:')
      clients.forEach(client => {
        const status = client.is_active ? '✅' : '❌'
        const lastLogin = client.last_login
          ? new Date(client.last_login).toLocaleDateString()
          : 'Never'
        console.log(`  ${status} ${client.email} - ${client.company} (Last login: ${lastLogin})`)
      })
    }

    console.log('\n━'.repeat(60))
    console.log(`Total: ${profiles.length} users (${admins.length} admins, ${clients.length} clients)`)

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

async function verifyUser(options) {
  const { email } = options

  if (!email) {
    console.error('❌ Email is required')
    console.error('Usage: verify --email user@example.com')
    return
  }

  console.log(`\n🔍 Verifying user: ${email}`)
  console.log('━'.repeat(50))

  try {
    // Check auth user
    console.log('Checking authentication...')
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers()

    if (authError) {
      console.error('❌ Failed to check auth:', authError.message)
      return
    }

    const authUser = users.find(u => u.email === email)

    if (authUser) {
      console.log('✅ Auth user exists')
      console.log(`   ID: ${authUser.id}`)
      console.log(`   Created: ${new Date(authUser.created_at).toLocaleDateString()}`)
      console.log(`   Confirmed: ${authUser.email_confirmed_at ? '✅' : '❌'}`)
    } else {
      console.log('❌ Auth user not found')
    }

    // Check profile
    console.log('\nChecking profile...')
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single()

    if (profile) {
      console.log('✅ Profile exists')
      console.log(`   Company: ${profile.company}`)
      console.log(`   Role: ${profile.role}`)
      console.log(`   Active: ${profile.is_active ? '✅' : '❌'}`)
      console.log(`   Last login: ${profile.last_login || 'Never'}`)
    } else {
      console.log('❌ Profile not found')
    }

    // Summary
    console.log('\n' + '━'.repeat(50))
    if (authUser && profile) {
      console.log('✅ User is fully configured and ready')
    } else if (authUser && !profile) {
      console.log('⚠️ Auth exists but profile missing - needs repair')
    } else if (!authUser && profile) {
      console.log('⚠️ Profile exists but auth missing - corrupted state')
    } else {
      console.log('❌ User does not exist')
    }

  } catch (error) {
    console.error('❌ Verification error:', error)
  }
}

async function deleteUser(options) {
  const { email } = options

  if (!email) {
    console.error('❌ Email is required')
    console.error('Usage: delete --email user@example.com')
    return
  }

  console.log(`\n⚠️ Preparing to delete user: ${email}`)

  // Create readline interface for confirmation
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('Type "DELETE" to confirm: ', async (answer) => {
    if (answer !== 'DELETE') {
      console.log('❌ Deletion cancelled')
      rl.close()
      return
    }

    try {
      // Find user
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single()

      if (!profile) {
        console.error('❌ User not found')
        rl.close()
        return
      }

      // Delete from auth (this cascades to profile due to foreign key)
      console.log('🗑️ Deleting user...')
      const { error } = await supabase.auth.admin.deleteUser(profile.id)

      if (error) {
        console.error('❌ Deletion failed:', error.message)
      } else {
        console.log('✅ User deleted successfully')
      }

    } catch (error) {
      console.error('❌ Deletion error:', error)
    }

    rl.close()
  })
}

// Main execution
async function main() {
  const { command, options } = parseArgs()

  console.log('\n🛡️ TwoPelicans AI Portal Admin')
  console.log('═'.repeat(60))

  switch (command) {
    case 'create':
      await createUser(options)
      break
    case 'list':
      await listUsers()
      break
    case 'verify':
      await verifyUser(options)
      break
    case 'delete':
      await deleteUser(options)
      break
    default:
      console.log('Available commands:')
      console.log('  create  - Create a new portal user')
      console.log('  list    - List all portal users')
      console.log('  verify  - Verify user configuration')
      console.log('  delete  - Delete a user')
      console.log('\nExamples:')
      console.log('  node scripts/portal-admin.js create --email user@example.com --company "ACME Corp"')
      console.log('  node scripts/portal-admin.js list')
      console.log('  node scripts/portal-admin.js verify --email user@example.com')
      console.log('  node scripts/portal-admin.js delete --email user@example.com')
  }
}

main()