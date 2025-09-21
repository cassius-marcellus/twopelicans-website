-- Temporarily disable RLS to test if that's the issue
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages DISABLE ROW LEVEL SECURITY;

-- Check that the profiles exist
SELECT * FROM public.profiles;