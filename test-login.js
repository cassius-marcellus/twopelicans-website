#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔐 Testing Login...\n');

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing Supabase credentials');
  console.log('   NEXT_PUBLIC_SUPABASE_URL:', SUPABASE_URL ? '✅' : '❌ Missing');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY ? '✅' : '❌ Missing');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testLogin() {
  console.log('Testing admin login...');
  console.log('Email: ray@twopelicans.ai');
  console.log('Password: admin2024\n');

  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'ray@twopelicans.ai',
    password: 'admin2024'
  });

  if (error) {
    console.error('❌ Login failed:', error.message);
    console.log('\nPossible issues:');
    console.log('1. Wrong password - try resetting in Supabase dashboard');
    console.log('2. User not confirmed - check email confirmation status');
    console.log('3. Auth not enabled - check Supabase auth settings');
    return;
  }

  console.log('✅ Login successful!');
  console.log('   User ID:', data.user.id);
  console.log('   Email:', data.user.email);

  // Check profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (profileError) {
    console.error('❌ Profile fetch failed:', profileError.message);
  } else {
    console.log('✅ Profile found:');
    console.log('   Role:', profile.role);
    console.log('   Company:', profile.company);
  }

  // Sign out
  await supabase.auth.signOut();
  console.log('\n✅ Test complete - signed out');
}

testLogin().catch(console.error);