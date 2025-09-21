# 🚀 Supabase Setup Instructions

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Click on **Settings** (gear icon) → **API**
3. Copy these values:
   - **Project URL**: `https://[your-project-ref].supabase.co`
   - **Anon Public Key**: (safe for client-side)
   - **Service Role Key**: (KEEP SECRET - server only)

## Step 2: Add to .env.local

Create or update your `.env.local` file with:

```env
# Existing Resend Configuration
RESEND_API_KEY=your_existing_resend_key
EMAIL_TO=ray@twopelicans.ai
EMAIL_FROM=hello@send.twopelicans.ai

# Supabase Configuration (ADD THESE)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Step 3: Update Database Schema

We need to use Supabase Auth instead of our custom auth. Run this NEW schema in your Supabase SQL Editor:

```sql
-- First, drop the old tables if they exist
DROP TABLE IF EXISTS portal_messages CASCADE;
DROP TABLE IF EXISTS portal_users CASCADE;

-- Create profiles table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  company TEXT NOT NULL,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  type TEXT CHECK (type IN ('sent', 'received')) NOT NULL DEFAULT 'sent',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_messages_user_id ON messages(user_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Messages policies
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own messages" ON messages
  FOR UPDATE USING (auth.uid() = user_id);

-- Function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, company, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'company', 'Unknown Company'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Step 4: Enable Email Auth in Supabase

1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Go to **Authentication** → **Settings**
4. Set these options:
   - Enable email confirmations: **OFF** (for testing)
   - Minimum password length: **8**

## Step 5: Create Initial Users

After the schema is set up, we'll create users programmatically through the admin panel.

## Step 6: Add to Vercel

Add these same environment variables to your Vercel project:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add all three Supabase variables

---

**IMPORTANT**: After adding your credentials to `.env.local`, tell me so I can continue with the auth implementation!