# Supabase Setup Instructions

## Quick Setup Guide

### Step 1: Run SQL in Supabase Dashboard

1. Go to your Supabase Dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy and paste the entire contents of `supabase/setup-database.sql`
5. Click "Run" to execute the SQL

This will create:
- `profiles` table for user management
- `messages` table for client messages
- Row Level Security policies
- Automatic profile creation trigger

### Step 2: Run the Setup Script

After the SQL has been executed:

```bash
node scripts/setup-supabase.js
```

This will:
- Create the admin user (ray@twopelicans.ai)
- Create a demo client user
- Set up proper roles

### Step 3: Test the Admin Panel

1. Visit http://localhost:3000/portal
2. Login with:
   - Email: ray@twopelicans.ai
   - Password: admin2024
3. You should now see the Admin Panel with:
   - Client management interface
   - Add/remove client functionality
   - Dashboard metrics

### Step 4: Test Client Creation

From the Admin Panel:
1. Click "Add Client"
2. Enter client email and company name
3. Click "Generate" for a secure password
4. Click "Create Account"
5. Copy the credentials to share with the client

## Environment Variables

Make sure these are set in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Troubleshooting

### "Could not find the table 'public.profiles'"
- Run the SQL script in Step 1
- The tables must be created before running the setup script

### Admin sees client dashboard instead of admin panel
- Run `node scripts/setup-supabase.js` after creating tables
- This ensures the admin role is properly set

### Cannot create new clients
- Verify SUPABASE_SERVICE_ROLE_KEY is set in .env.local
- This key is required for admin operations

## Security Notes

1. **CHANGE THE ADMIN PASSWORD** immediately after setup
2. Never commit .env.local to version control
3. Use the service role key only on the server side
4. All client passwords are hashed with bcrypt via Supabase

## Production Deployment

1. Add all environment variables to Vercel
2. Run the SQL script in your production Supabase instance
3. Create production admin account with a secure password
4. Test all functionality before sharing with clients