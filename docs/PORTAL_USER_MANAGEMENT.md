# Portal User Management Guide

## Overview
This guide provides a bulletproof workflow for creating and managing client users in the TwoPelicans AI Portal. The system has been enhanced with multiple safeguards to ensure 100% reliability.

## Quick Start - Creating a New Client

### Method 1: CLI Tool (Recommended for Reliability)
```bash
node scripts/portal-admin.js create --email client@example.com --company "Client Company Name"
```

This command will:
1. Generate a secure password automatically
2. Create the authentication user
3. Create the profile with proper role
4. Verify everything was created correctly
5. Test login capability
6. Display credentials for sharing

### Method 2: Admin Panel (Web UI)
1. Navigate to https://twopelicans.ai/portal/admin
2. Click "Add Client" button
3. Enter email, company name
4. Click "Generate" for secure password
5. Click "Create Account"
6. Use "Copy Credentials" button to share

## CLI Tool Commands

### Create User
```bash
# Auto-generate password
node scripts/portal-admin.js create --email user@example.com --company "Company Name"

# Specify password
node scripts/portal-admin.js create --email user@example.com --company "Company Name" --password "SecurePass123!"
```

### List All Users
```bash
node scripts/portal-admin.js list
```

### Verify User Setup
```bash
node scripts/portal-admin.js verify --email user@example.com
```

### Delete User
```bash
node scripts/portal-admin.js delete --email user@example.com
```

## Key Improvements Implemented

### 1. Enhanced API Endpoint (`/api/auth/users`)
- **Atomic Operations**: Creates both auth and profile in transaction
- **Automatic Rollback**: Deletes auth user if profile creation fails
- **Verification Step**: Confirms both records exist before returning success
- **Login Test**: Validates credentials work immediately
- **Email Notifications**: Optional welcome email to new users
- **Detailed Response**: Returns creation status with verification flags

### 2. Robust CLI Tool (`scripts/portal-admin.js`)
- **Pre-flight Checks**: Validates email format and password strength
- **Duplicate Prevention**: Checks for existing users before creation
- **Step-by-Step Feedback**: Shows progress through creation process
- **Automatic Rollback**: Cleans up on any failure
- **Verification Built-in**: Tests login after creation
- **Clear Output**: Formatted credentials ready to share

### 3. Database Safeguards
- **Foreign Key Constraints**: Profile deletion cascades from auth
- **Row-Level Security**: Ensures data isolation
- **Explicit Profile Creation**: Doesn't rely on triggers alone
- **Verification Queries**: Confirms data integrity

## Workflow Process

### Step 1: Pre-Creation Validation
- Validate email format
- Check for existing users
- Generate or validate password (min 8 chars)
- Verify admin permissions

### Step 2: User Creation
1. Create Supabase Auth user with metadata
2. Explicitly create profile record (doesn't rely on trigger)
3. Set role as 'client' and is_active as true
4. Store company information

### Step 3: Verification
- Query profile to ensure it exists
- Test login with credentials
- Verify auth and profile IDs match
- Check all fields populated correctly

### Step 4: Communication
- Display credentials clearly
- Optional: Send welcome email
- Provide portal URL and instructions
- Remind to change password on first login

## Error Handling

The system handles these failure scenarios:

1. **Duplicate Email**: Prevents creation, shows clear error
2. **Auth Creation Failure**: Returns error, no cleanup needed
3. **Profile Creation Failure**: Deletes auth user, returns error
4. **Verification Failure**: Rolls back everything, returns error
5. **Network Issues**: Times out gracefully, manual verification available

## Credential Sharing Template

```
Portal Access for [Company Name]

URL: https://twopelicans.ai/portal
Email: [user@example.com]
Password: [generated_password]

Please keep these credentials secure and change your password after first login.

For support, contact your account manager.
```

## Troubleshooting

### User Can't Login
1. Run `node scripts/portal-admin.js verify --email user@example.com`
2. Check both auth and profile exist
3. If profile missing, manually create with CLI tool
4. If auth missing, delete profile and recreate user

### Profile Not Created Automatically
- The Supabase trigger doesn't fire for admin-created users
- Our enhanced API and CLI tool handle this by explicitly creating profiles
- Always use our tools rather than Supabase dashboard directly

### Password Reset Issues
- Users can reset passwords at https://twopelicans.ai/portal
- Admin can generate new password via CLI tool (recreate user)
- Password reset emails valid for 1 hour

## Security Best Practices

1. **Password Requirements**
   - Minimum 8 characters
   - Include uppercase, lowercase, numbers, symbols
   - Avoid common patterns

2. **Credential Sharing**
   - Never send passwords via email
   - Use secure messaging or phone
   - Require password change on first login

3. **Regular Audits**
   - Run `node scripts/portal-admin.js list` weekly
   - Check for inactive accounts
   - Remove access when clients leave

## Testing New Users

After creating a user, always:
1. Verify with CLI: `node scripts/portal-admin.js verify --email user@example.com`
2. Test login at https://twopelicans.ai/portal
3. Confirm dashboard loads properly
4. Test password reset flow if needed

## Support

For issues or questions:
- Check this guide first
- Run verification commands
- Review error messages carefully
- Contact admin if database issues persist

---

Last Updated: September 21, 2025
Version: 2.0 - Enhanced with bulletproof safeguards