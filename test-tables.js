#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function testTables() {
  console.log('🔍 Testing Supabase Tables...\n');

  // Test 1: Check if profiles table exists
  console.log('1️⃣  Checking profiles table...');
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*')
    .limit(1);

  if (profilesError) {
    console.log('❌ Profiles table error:', profilesError.message);
  } else {
    console.log('✅ Profiles table exists!');
    console.log('   Found', profiles?.length || 0, 'profiles');
  }

  // Test 2: Check if messages table exists
  console.log('\n2️⃣  Checking messages table...');
  const { data: messages, error: messagesError } = await supabase
    .from('messages')
    .select('*')
    .limit(1);

  if (messagesError) {
    console.log('❌ Messages table error:', messagesError.message);
  } else {
    console.log('✅ Messages table exists!');
    console.log('   Found', messages?.length || 0, 'messages');
  }

  // Test 3: Check auth users
  console.log('\n3️⃣  Checking auth users...');
  const { data: authData } = await supabase.auth.admin.listUsers();

  if (authData?.users) {
    console.log('✅ Found', authData.users.length, 'auth users:');
    authData.users.forEach(u => {
      console.log(`   - ${u.email} (${u.id})`);
    });
  }

  console.log('\n📝 Troubleshooting:');
  console.log('If tables are not found:');
  console.log('1. Go back to Supabase SQL Editor');
  console.log('2. Check the output/results of your SQL query');
  console.log('3. Look for any error messages');
  console.log('4. Try refreshing the Supabase dashboard');
  console.log('5. Check Table Editor to see if tables were created');
}

testTables().catch(console.error);