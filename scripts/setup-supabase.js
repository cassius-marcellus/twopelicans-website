#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('   Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupDatabase() {
  console.log('🚀 Setting up Supabase database...\n');

  try {
    // Step 1: Create the admin user in Auth
    console.log('1️⃣  Creating admin user in Supabase Auth...');

    const { data: existingUser } = await supabase.auth.admin.listUsers();
    const adminExists = existingUser?.users?.some(u => u.email === 'ray@twopelicans.ai');

    let adminUserId;

    if (!adminExists) {
      const { data: newAdmin, error: createError } = await supabase.auth.admin.createUser({
        email: 'ray@twopelicans.ai',
        password: 'admin2024',
        email_confirm: true,
        user_metadata: {
          company: 'TwoPelicans AI',
          role: 'admin'
        }
      });

      if (createError) {
        console.error('❌ Error creating admin user:', createError.message);
        return;
      }

      adminUserId = newAdmin.user.id;
      console.log('✅ Admin user created successfully');
      console.log('   Email: ray@twopelicans.ai');
      console.log('   Password: admin2024 (CHANGE THIS!)');
    } else {
      // Get existing admin user ID
      const admin = existingUser.users.find(u => u.email === 'ray@twopelicans.ai');
      adminUserId = admin.id;
      console.log('✅ Admin user already exists');
    }

    // Step 2: Ensure profile exists with admin role
    console.log('\n2️⃣  Setting up admin profile...');

    // First check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', adminUserId)
      .single();

    if (!existingProfile) {
      // Create profile if it doesn't exist
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: adminUserId,
          email: 'ray@twopelicans.ai',
          company: 'TwoPelicans AI',
          role: 'admin',
          is_active: true
        });

      if (profileError) {
        console.error('❌ Error creating profile:', profileError.message);
        // The trigger might have already created it, let's update instead
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            role: 'admin',
            company: 'TwoPelicans AI'
          })
          .eq('id', adminUserId);

        if (updateError) {
          console.error('❌ Error updating profile:', updateError.message);
        } else {
          console.log('✅ Admin profile updated successfully');
        }
      } else {
        console.log('✅ Admin profile created successfully');
      }
    } else {
      // Update existing profile to ensure admin role
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          role: 'admin',
          company: 'TwoPelicans AI'
        })
        .eq('id', adminUserId);

      if (updateError) {
        console.error('❌ Error updating profile:', updateError.message);
      } else {
        console.log('✅ Admin profile updated successfully');
      }
    }

    // Step 3: Create a demo client user
    console.log('\n3️⃣  Creating demo client user...');

    const { data: demoExists } = await supabase.auth.admin.listUsers();
    const hasDemoUser = demoExists?.users?.some(u => u.email === 'demo@client.com');

    if (!hasDemoUser) {
      const { data: demoUser, error: demoError } = await supabase.auth.admin.createUser({
        email: 'demo@client.com',
        password: 'demo2024',
        email_confirm: true,
        user_metadata: {
          company: 'Demo Company',
          role: 'client'
        }
      });

      if (demoError) {
        console.error('⚠️  Could not create demo user:', demoError.message);
      } else {
        console.log('✅ Demo client created successfully');
        console.log('   Email: demo@client.com');
        console.log('   Password: demo2024');
      }
    } else {
      console.log('✅ Demo client already exists');
    }

    // Step 4: Verify setup
    console.log('\n4️⃣  Verifying setup...');

    const { data: profiles, error: verifyError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: true });

    if (verifyError) {
      console.error('⚠️  Could not verify profiles:', verifyError.message);
      console.log('\n⚠️  Note: The profiles table might not exist yet.');
      console.log('   Please run the SQL script in supabase/setup-database.sql');
      console.log('   in your Supabase dashboard SQL editor.');
    } else {
      console.log('✅ Found', profiles.length, 'user profiles:');
      profiles.forEach(p => {
        console.log(`   - ${p.email} (${p.role}) - ${p.company}`);
      });
    }

    console.log('\n✅ Setup complete!');
    console.log('\n📝 Next steps:');
    console.log('1. If you see a warning about the profiles table:');
    console.log('   - Go to your Supabase dashboard');
    console.log('   - Open the SQL editor');
    console.log('   - Run the script in supabase/setup-database.sql');
    console.log('\n2. Test the admin panel:');
    console.log('   - Visit http://localhost:3000/portal');
    console.log('   - Login with: ray@twopelicans.ai / admin2024');
    console.log('   - You should see the Admin Panel');
    console.log('\n3. IMPORTANT: Change the admin password!');

  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

// Run setup
setupDatabase();