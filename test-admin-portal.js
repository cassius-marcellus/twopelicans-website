#!/usr/bin/env node

const TEST_ADMIN_EMAIL = 'ray@twopelicans.ai';
const TEST_ADMIN_PASSWORD = 'admin2024';
const BASE_URL = 'http://localhost:3000';

async function testAdminLogin() {
  console.log('🔑 Testing Admin Login...');

  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: TEST_ADMIN_EMAIL,
        password: TEST_ADMIN_PASSWORD
      })
    });

    const data = await response.json();

    if (response.ok && data.user) {
      console.log('✅ Login successful!');
      console.log('   Role:', data.user.role);
      console.log('   Email:', data.user.email);
      console.log('   Company:', data.user.company);

      if (data.user.role === 'admin') {
        console.log('✅ Admin role confirmed!');
        return data.session;
      } else {
        console.log('❌ User is not an admin!');
        return null;
      }
    } else {
      console.log('❌ Login failed:', data.error || 'Unknown error');
      return null;
    }
  } catch (error) {
    console.log('❌ Connection error:', error.message);
    return null;
  }
}

async function testAdminAccess(session) {
  console.log('\n🔐 Testing Admin Panel Access...');

  if (!session) {
    console.log('❌ No session available, skipping admin access test');
    return;
  }

  try {
    // Test fetching users (admin-only endpoint)
    const response = await fetch(`${BASE_URL}/api/auth/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `sb-access-token=${session.access_token}; sb-refresh-token=${session.refresh_token}`
      }
    });

    if (response.ok) {
      const users = await response.json();
      console.log('✅ Admin API access confirmed!');
      console.log(`   Found ${users.length} users in the system`);

      // List non-admin users
      const clients = users.filter(u => u.role !== 'admin');
      if (clients.length > 0) {
        console.log('\n📋 Current Clients:');
        clients.forEach(client => {
          console.log(`   - ${client.email} (${client.company})`);
        });
      } else {
        console.log('\n   No clients in the system yet');
      }
    } else {
      const error = await response.json();
      console.log('❌ Admin API access denied:', error.error || response.status);
    }
  } catch (error) {
    console.log('❌ API test failed:', error.message);
  }
}

async function testClientCreation(session) {
  console.log('\n➕ Testing Client Creation...');

  if (!session) {
    console.log('❌ No session available, skipping client creation test');
    return;
  }

  const testClient = {
    email: `test-${Date.now()}@example.com`,
    company: 'Test Company',
    password: 'TestPass123!'
  };

  try {
    const response = await fetch(`${BASE_URL}/api/auth/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `sb-access-token=${session.access_token}; sb-refresh-token=${session.refresh_token}`
      },
      body: JSON.stringify(testClient)
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Test client created successfully!');
      console.log('   Email:', testClient.email);
      console.log('   Company:', testClient.company);
      return data.user.id;
    } else {
      console.log('❌ Client creation failed:', data.error || 'Unknown error');
      return null;
    }
  } catch (error) {
    console.log('❌ Creation test failed:', error.message);
    return null;
  }
}

async function testClientDeletion(session, userId) {
  console.log('\n🗑️  Testing Client Deletion...');

  if (!session || !userId) {
    console.log('❌ Missing session or user ID, skipping deletion test');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/auth/users?id=${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `sb-access-token=${session.access_token}; sb-refresh-token=${session.refresh_token}`
      }
    });

    if (response.ok) {
      console.log('✅ Test client deleted successfully!');
    } else {
      const error = await response.json();
      console.log('❌ Client deletion failed:', error.error || 'Unknown error');
    }
  } catch (error) {
    console.log('❌ Deletion test failed:', error.message);
  }
}

async function runTests() {
  console.log('🧪 Admin Portal Test Suite');
  console.log('==========================\n');

  // Test 1: Admin Login
  const session = await testAdminLogin();

  // Test 2: Admin Access
  await testAdminAccess(session);

  // Test 3: Client Creation
  const testUserId = await testClientCreation(session);

  // Test 4: Client Deletion (cleanup)
  if (testUserId) {
    await testClientDeletion(session, testUserId);
  }

  console.log('\n==========================');
  console.log('✅ Test suite completed!');
  console.log('\nNOTE: To fully test the admin panel UI:');
  console.log('1. Visit http://localhost:3000/portal');
  console.log('2. Login with:', TEST_ADMIN_EMAIL);
  console.log('3. Use password: admin2024 (CHANGE THIS!)');
  console.log('4. You should see the Admin Panel with client management features');
}

// Run the tests
runTests().catch(console.error);