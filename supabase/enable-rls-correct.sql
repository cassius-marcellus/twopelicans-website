-- Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies first
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can read profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;

-- Create a single, simple policy for profiles
-- ALLOW ALL operations for authenticated users on profiles table
CREATE POLICY "Enable read access for authenticated users" ON public.profiles
  FOR SELECT
  USING (true);  -- Allow all authenticated users to read all profiles

CREATE POLICY "Enable update for users based on id" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Enable delete for admins" ON public.profiles
  FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Enable insert for admins" ON public.profiles
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ) OR auth.uid() = id);

-- Policies for messages table
DROP POLICY IF EXISTS "Users can create own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can read own messages" ON public.messages;
DROP POLICY IF EXISTS "Admins can read all messages" ON public.messages;
DROP POLICY IF EXISTS "Admins can update messages" ON public.messages;

CREATE POLICY "Enable all for authenticated users on messages" ON public.messages
  FOR ALL
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Test the policies
SELECT COUNT(*) as profile_count FROM public.profiles;
SELECT COUNT(*) as message_count FROM public.messages;