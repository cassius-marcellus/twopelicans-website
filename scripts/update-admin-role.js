#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_EMAIL = 'ray@twopelicans.ai';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

async function updateAdminRole() {
  console.log('🔧 Updating Admin Role for:', ADMIN_EMAIL);

  // Create admin client with service role key
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    // First, find the user by email
    const { data: users, error: searchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', ADMIN_EMAIL);

    if (searchError) {
      console.error('❌ Error finding user:', searchError);
      return;
    }

    if (!users || users.length === 0) {
      console.error('❌ User not found:', ADMIN_EMAIL);
      console.log('   Make sure the user has logged in at least once');
      return;
    }

    const user = users[0];
    console.log('✅ Found user:', user.email);
    console.log('   Current role:', user.role);
    console.log('   User ID:', user.id);

    // Update the role to admin
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        role: 'admin',
        company: 'TwoPelicans AI'
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('❌ Error updating role:', updateError);
      return;
    }

    console.log('✅ Role updated successfully!');
    console.log('   New role: admin');
    console.log('   Company: TwoPelicans AI');

    // Verify the update
    const { data: updatedUser, error: verifyError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (verifyError) {
      console.error('❌ Error verifying update:', verifyError);
      return;
    }

    console.log('\n📋 Updated User Profile:');
    console.log('   Email:', updatedUser.email);
    console.log('   Role:', updatedUser.role);
    console.log('   Company:', updatedUser.company);
    console.log('   Active:', updatedUser.is_active);

    console.log('\n✅ Admin setup complete!');
    console.log('\n🔑 Next steps:');
    console.log('1. Login at http://localhost:3000/portal');
    console.log('2. You should now see the Admin Panel');
    console.log('3. IMPORTANT: Change your password immediately!');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run the update
updateAdminRole();