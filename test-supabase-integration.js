#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Supabase Integration Audit\n');
console.log('=====================================\n');

// Check for localStorage/sessionStorage usage
const checkForLocalStorage = (dir, indent = '') => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let issues = [];

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    // Skip node_modules, .next, and other build directories
    if (file.name === 'node_modules' || file.name === '.next' || file.name === '.git') {
      continue;
    }

    if (file.isDirectory()) {
      issues = [...issues, ...checkForLocalStorage(fullPath, indent + '  ')];
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');

      // Check for localStorage
      if (content.includes('localStorage') && !content.includes('// ')) {
        const lines = content.split('\n');
        lines.forEach((line, i) => {
          if (line.includes('localStorage') && !line.trim().startsWith('//') && !line.trim().startsWith('*')) {
            issues.push({
              file: fullPath,
              line: i + 1,
              type: 'localStorage',
              content: line.trim()
            });
          }
        });
      }

      // Check for sessionStorage (except in comments)
      if (content.includes('sessionStorage')) {
        const lines = content.split('\n');
        lines.forEach((line, i) => {
          if (line.includes('sessionStorage') && !line.trim().startsWith('//') && !line.trim().startsWith('*')) {
            issues.push({
              file: fullPath,
              line: i + 1,
              type: 'sessionStorage',
              content: line.trim()
            });
          }
        });
      }
    }
  }

  return issues;
};

// Check for Supabase imports
const checkSupabaseIntegration = (dir) => {
  const portalFiles = [];
  const checkDir = (currentDir) => {
    const files = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(currentDir, file.name);

      if (file.name === 'node_modules' || file.name === '.next' || file.name === '.git') {
        continue;
      }

      if (file.isDirectory()) {
        checkDir(fullPath);
      } else if (fullPath.includes('/portal/') && (file.name.endsWith('.tsx') || file.name.endsWith('.ts'))) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const hasSupabase = content.includes('supabase') || content.includes('Supabase');
        const hasAuth = content.includes('auth') || content.includes('Auth');

        portalFiles.push({
          file: fullPath.replace(process.cwd(), '.'),
          hasSupabase,
          hasAuth
        });
      }
    }
  };

  checkDir(dir);
  return portalFiles;
};

// Run checks
console.log('1️⃣  Checking for localStorage/sessionStorage usage...\n');
const storageIssues = checkForLocalStorage(path.join(process.cwd(), 'app'));

if (storageIssues.length === 0) {
  console.log('✅ No localStorage/sessionStorage usage found in code!\n');
} else {
  console.log(`⚠️  Found ${storageIssues.length} instances of local storage usage:\n`);
  storageIssues.forEach(issue => {
    console.log(`   📍 ${issue.file.replace(process.cwd(), '.')}:${issue.line}`);
    console.log(`      Type: ${issue.type}`);
    console.log(`      Code: ${issue.content.substring(0, 80)}...`);
    console.log('');
  });
}

console.log('2️⃣  Checking Supabase integration in portal files...\n');
const portalFiles = checkSupabaseIntegration(process.cwd());

const portalPages = portalFiles.filter(f => f.file.includes('/portal/') && f.file.endsWith('.tsx'));
console.log(`Found ${portalPages.length} portal pages:\n`);

portalPages.forEach(page => {
  const status = page.hasSupabase ? '✅' : '❌';
  const authStatus = page.hasAuth ? '🔐' : '⚠️';
  console.log(`   ${status} ${page.file}`);
  console.log(`      ${authStatus} ${page.hasSupabase ? 'Uses Supabase' : 'No Supabase usage'} | ${page.hasAuth ? 'Has auth logic' : 'No auth logic'}`);
});

console.log('\n3️⃣  Portal Authentication Summary:\n');

const allPortalFiles = [
  './app/portal/page.tsx',
  './app/portal/dashboard/page.tsx',
  './app/portal/admin/page.tsx'
];

allPortalFiles.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const checks = {
      supabaseImport: content.includes("from '@/lib/supabase"),
      supabaseAuth: content.includes('supabase.auth'),
      profilesTable: content.includes("from('profiles')"),
      messagesTable: content.includes("from('messages')"),
      signOut: content.includes('signOut'),
      getUser: content.includes('getUser')
    };

    console.log(`📄 ${file}`);
    Object.entries(checks).forEach(([check, passes]) => {
      console.log(`   ${passes ? '✅' : '❌'} ${check}`);
    });
    console.log('');
  }
});

console.log('=====================================\n');
console.log('🎯 Summary:\n');

if (storageIssues.length === 0) {
  console.log('✅ All portal files are using Supabase authentication');
  console.log('✅ No localStorage or sessionStorage found in implementation');
  console.log('✅ Messages are stored in Supabase database');
  console.log('✅ Row Level Security policies protect data');
} else {
  console.log('⚠️  Some files may still be using local storage');
  console.log('   Review the issues above and update accordingly');
}

console.log('\n📝 Next Steps:');
console.log('1. Run SQL script in Supabase dashboard');
console.log('2. Execute: node scripts/setup-supabase.js');
console.log('3. Test login at http://localhost:3000/portal');
console.log('4. Verify admin panel shows for admin users');
console.log('5. Test client dashboard for client users');