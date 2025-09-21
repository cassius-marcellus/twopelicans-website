#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function createAdminProfile() {
  console.log('🔧 Creating Admin Profile...\n');

  try {
    // Get the admin user ID from auth
    const { data: authData } = await supabase.auth.admin.listUsers();
    const adminUser = authData?.users?.find(u => u.email === 'ray@twopelicans.ai');
    const demoUser = authData?.users?.find(u => u.email === 'demo@client.com');

    if (!adminUser) {
      console.error('❌ Admin user not found in auth.users');
      console.log('   Please run: node scripts/setup-supabase.js first');
      return;
    }

    console.log('✅ Found admin user:', adminUser.email);
    console.log('   User ID:', adminUser.id);

    // Create admin profile
    console.log('\n📝 Creating admin profile...');

    const { error: adminError } = await supabase
      .from('profiles')
      .upsert({
        id: adminUser.id,
        email: adminUser.email,
        company: 'TwoPelicans AI',
        role: 'admin',
        is_active: true
      }, {
        onConflict: 'id'
      });

    if (adminError) {
      console.error('❌ Error creating admin profile:', adminError.message);
    } else {
      console.log('✅ Admin profile created/updated successfully!');
    }

    // Create demo client profile if exists
    if (demoUser) {
      console.log('\n📝 Creating demo client profile...');

      const { error: demoError } = await supabase
        .from('profiles')
        .upsert({
          id: demoUser.id,
          email: demoUser.email,
          company: 'Demo Company',
          role: 'client',
          is_active: true
        }, {
          onConflict: 'id'
        });

      if (demoError) {
        console.error('❌ Error creating demo profile:', demoError.message);
      } else {
        console.log('✅ Demo client profile created/updated successfully!');
      }
    }

    // Verify profiles
    console.log('\n🔍 Verifying profiles...');
    const { data: profiles, error: listError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at');

    if (listError) {
      console.error('❌ Error listing profiles:', listError.message);
    } else {
      console.log('✅ Found', profiles.length, 'profiles:');
      profiles.forEach(p => {
        console.log(`   - ${p.email} (${p.role}) - ${p.company}`);
      });
    }

    console.log('\n✅ Setup complete!');
    console.log('\n🔑 Test the portal:');
    console.log('1. Visit http://localhost:3000/portal');
    console.log('2. Login with: ray@twopelicans.ai / admin2024');
    console.log('3. You should see the Admin Panel');
    console.log('\n⚠️  IMPORTANT: Change the admin password immediately!');

  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

createAdminProfile();