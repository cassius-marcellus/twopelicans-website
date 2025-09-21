# Deploy Portal to Production (twopelicans.ai)

## Step 1: Add Supabase Environment Variables to Vercel

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard
   - Select your `website-builder` project

2. **Go to Settings → Environment Variables**

3. **Add these 3 variables** (get values from your Supabase project):
   ```
   NEXT_PUBLIC_SUPABASE_URL = [Your Supabase Project URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY = [Your Supabase Anon/Public Key]
   SUPABASE_SERVICE_ROLE_KEY = [Your Supabase Service Role Key]
   ```

   **Where to find these in Supabase:**
   - Go to your Supabase project
   - Click "Settings" (gear icon)
   - Click "API" in the sidebar
   - Copy:
     - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
     - Anon/Public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - Service Role key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## Step 2: Commit and Push Your Changes

```bash
# Check what's changed
git status

# Add all portal-related files
git add .

# Commit with descriptive message
git commit -m "Add secure client portal with Supabase authentication

- Admin panel for client management
- Client dashboard with messaging
- Secure authentication with Supabase
- Row Level Security policies
- Email notifications for messages"

# Push to GitHub (triggers auto-deploy)
git push origin main
```

## Step 3: Verify Deployment

1. **Wait 2-3 minutes** for Vercel to build and deploy

2. **Check build status** at:
   - https://vercel.com/dashboard
   - Look for green checkmark

3. **Test the live portal**:
   - Visit: https://twopelicans.ai/portal
   - Login with admin credentials
   - Test all functionality

## Step 4: Important Security Steps

### In Supabase Dashboard:

1. **Change Admin Password**:
   - Go to Authentication → Users
   - Find ray@twopelicans.ai
   - Click "..." → Send Password Reset
   - Check your email and set a strong password

2. **Update Site URL** (if needed):
   - Go to Authentication → URL Configuration
   - Set Site URL to: `https://twopelicans.ai`
   - Add to Redirect URLs: `https://twopelicans.ai/portal/*`

3. **Enable Email Verification** (optional but recommended):
   - Go to Authentication → Providers → Email
   - Enable "Confirm email"

## Step 5: Create Real Client Accounts

Once live, you can:
1. Login to https://twopelicans.ai/portal with admin account
2. Go to Admin Panel
3. Add real client accounts
4. Share credentials securely with clients

## Troubleshooting

### If login doesn't work on production:

1. **Check Vercel logs**:
   - Vercel Dashboard → Functions tab → View logs

2. **Verify environment variables**:
   - Make sure all 3 Supabase variables are set in Vercel
   - Redeploy after adding variables (Deployments → Redeploy)

3. **Check Supabase URL settings**:
   - Ensure Site URL includes your production domain

### If you see CORS errors:

In Supabase:
- Go to Authentication → URL Configuration
- Add `https://twopelicans.ai` to allowed URLs

## URLs Once Deployed:

- **Portal Login**: https://twopelicans.ai/portal
- **Admin Panel**: https://twopelicans.ai/portal/admin
- **Client Dashboard**: https://twopelicans.ai/portal/dashboard

## Security Reminders:

⚠️ **NEVER commit** `.env.local` file
⚠️ **ALWAYS use** strong passwords
⚠️ **REGULARLY review** client access
⚠️ **MONITOR** Supabase dashboard for usage