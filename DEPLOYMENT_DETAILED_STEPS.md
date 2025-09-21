# Detailed Deployment Instructions for Beginners

## Part 1: Getting Your Supabase Keys

### Step 1: Open Supabase Dashboard
1. Go to https://supabase.com
2. Click "Sign In" (top right)
3. Sign in with your account
4. You'll see your project dashboard

### Step 2: Find Your Project Settings
1. Look for your project (probably named something like "website-builder" or similar)
2. Click on it to open the project
3. On the left sidebar, look for the **gear icon ⚙️** that says "Settings"
4. Click on "Settings"

### Step 3: Get Your API Keys
1. After clicking Settings, look in the left sidebar for "API"
2. Click on "API"
3. You'll see a page with your keys. You need to copy 3 things:

   **First Key - Project URL:**
   - Look for "Project URL"
   - It looks like: `https://xxxxxxxxxxxxx.supabase.co`
   - Click the "Copy" button next to it

   **Second Key - Anon/Public Key:**
   - Look for "anon" or "public" key (it's safe to share)
   - It's a long string of random characters
   - Click the "Copy" button next to it

   **Third Key - Service Role Key:**
   - Look for "service_role" key (keep this SECRET!)
   - You might need to click "Reveal" to see it
   - It's another long string of random characters
   - Click the "Copy" button next to it

### Step 4: Save These Temporarily
Open a text document and paste them like this:
```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Part 2: Adding Keys to Vercel

### Step 1: Open Vercel Dashboard
1. Go to https://vercel.com
2. Sign in with your GitHub account (same one you used before)
3. You'll see your dashboard

### Step 2: Find Your Project
1. Look for your project - it should be called "website-builder"
2. Click on the project name

### Step 3: Go to Settings
1. Once in your project, look at the top menu
2. You'll see tabs like "Project", "Analytics", "Settings", etc.
3. Click on **"Settings"**

### Step 4: Find Environment Variables
1. In Settings, look at the left sidebar
2. Find and click on **"Environment Variables"**
3. This is where we add the Supabase keys

### Step 5: Add Each Variable
You'll add 3 variables, one at a time:

**For the first one:**
1. In the "Key" field, type: `NEXT_PUBLIC_SUPABASE_URL`
2. In the "Value" field, paste your Project URL (from Supabase)
3. Leave "Environment" checkboxes as they are (all checked)
4. Click "Save"

**For the second one:**
1. Click "Add Another"
2. Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Value: Paste your anon/public key
4. Click "Save"

**For the third one:**
1. Click "Add Another"
2. Key: `SUPABASE_SERVICE_ROLE_KEY`
3. Value: Paste your service role key
4. Make sure to check "Sensitive" (hides the value)
5. Click "Save"

### Step 6: Verify They're All Added
You should now see all 3 environment variables listed:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

---

## Part 3: Deploy Your Changes

### Step 1: Save All Your Work
Make sure all your files are saved in VS Code

### Step 2: Open Terminal
1. In VS Code, go to Terminal menu → New Terminal
2. Or use the terminal that's already open

### Step 3: Check What Changed
Type this command and press Enter:
```bash
git status
```

You'll see a list of files that changed (probably a lot!)

### Step 4: Add All Changes
Type this command and press Enter:
```bash
git add .
```
(The dot means "add everything")

### Step 5: Commit Your Changes
Type this command and press Enter:
```bash
git commit -m "Add secure client portal with Supabase authentication"
```

### Step 6: Push to GitHub
Type this command and press Enter:
```bash
git push origin main
```

You might need to enter your GitHub username and password/token.

### Step 7: Watch It Deploy
1. Go back to Vercel dashboard
2. You'll see a new deployment starting automatically
3. Wait 2-3 minutes for it to finish
4. Look for a green checkmark ✅

---

## Part 4: Test Your Live Site

### Once Deployed:
1. Go to https://twopelicans.ai/portal
2. Try logging in with:
   - Email: ray@twopelicans.ai
   - Password: admin2024
3. You should see the admin panel!

### If Something Doesn't Work:
1. In Vercel, click on the deployment
2. Click "Functions" tab
3. Look for any error messages
4. Most common issue: Missing environment variables (go back and check Part 2)

---

## Important Final Steps:

### Change Your Admin Password:
1. Go to Supabase dashboard
2. Click Authentication → Users
3. Find ray@twopelicans.ai
4. Click the three dots → Send Password Reset
5. Check your email and set a strong password

---

## Need Help?
If you get stuck at any step, let me know:
- Which step number you're on
- What you see on your screen
- Any error messages

This is a one-time setup - once it's done, future updates will deploy automatically!