-- Create portal_users table
CREATE TABLE portal_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  company TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Create portal_messages table
CREATE TABLE portal_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  sender TEXT NOT NULL,
  type TEXT CHECK (type IN ('sent', 'received')) NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  FOREIGN KEY (user_email) REFERENCES portal_users(email) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_portal_users_email ON portal_users(email);
CREATE INDEX idx_portal_messages_user_email ON portal_messages(user_email);
CREATE INDEX idx_portal_messages_created_at ON portal_messages(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE portal_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for portal_users
-- Admin can see all users
CREATE POLICY "Admins can view all users" ON portal_users
  FOR SELECT
  USING (true);  -- We'll check admin status in the application

-- Users can view their own record
CREATE POLICY "Users can view own record" ON portal_users
  FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

-- Only admins can insert/update/delete users (handled server-side)
CREATE POLICY "Only admins can manage users" ON portal_users
  FOR ALL
  USING (false)  -- Block all client-side modifications
  WITH CHECK (false);

-- Create policies for portal_messages
-- Users can view their own messages
CREATE POLICY "Users can view own messages" ON portal_messages
  FOR SELECT
  USING (auth.jwt() ->> 'email' = user_email);

-- Users can insert their own messages
CREATE POLICY "Users can send messages" ON portal_messages
  FOR INSERT
  WITH CHECK (auth.jwt() ->> 'email' = user_email);

-- Users can update their own messages (for marking as read)
CREATE POLICY "Users can update own messages" ON portal_messages
  FOR UPDATE
  USING (auth.jwt() ->> 'email' = user_email);

-- Insert initial admin user
INSERT INTO portal_users (email, password_hash, company, is_admin, is_active)
VALUES ('ray@twopelicans.ai', '554992133199bf76f5bc25d43db159bbbb669f4fa9f5dc52e26f52ef453e3704', 'TwoPelicans Admin', true, true);

-- Insert demo user for testing
INSERT INTO portal_users (email, password_hash, company, is_admin, is_active)
VALUES ('demo@client.com', '80789016b2d3b1bac07a1e54167aa7253b9c5300ffdc97d699aeca7c5c8912d3', 'Demo Corp', false, true);