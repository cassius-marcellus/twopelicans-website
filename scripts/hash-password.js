// Simple password hashing utility
// Run: node scripts/hash-password.js "yourpassword"

const crypto = require('crypto');

function hashPassword(password) {
  const salt = 'twopelicans-portal-v1'; // Fixed salt for simplicity
  const hash = crypto.createHash('sha256');
  hash.update(password + salt);
  return hash.digest('hex');
}

const password = process.argv[2];
if (!password) {
  console.log('Usage: node scripts/hash-password.js "yourpassword"');
  process.exit(1);
}

const hashed = hashPassword(password);
console.log(`Password: ${password}`);
console.log(`Hash: ${hashed}`);
console.log('\nUse this hash in your database.');