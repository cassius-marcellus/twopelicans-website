# How to Find SQL Editor in Supabase

## Location in Dashboard

The SQL Editor is in the **main left sidebar**, not in settings:

1. **Go to your Supabase Dashboard**
   - https://supabase.com/dashboard/project/[your-project-id]

2. **Look at the LEFT SIDEBAR** (main navigation)

3. **Find the SQL Editor icon** - it looks like:
   - 📝 A document/file icon
   - Usually labeled "SQL Editor" or just "SQL"
   - Typically located around the middle of the sidebar

## Alternative Ways to Access:

### Option 1: Direct URL
```
https://supabase.com/dashboard/project/[your-project-id]/sql
```
Replace [your-project-id] with your actual project ID

### Option 2: Navigation Path
1. Main Dashboard
2. Left Sidebar
3. Look for these sections in order:
   - Table Editor
   - **SQL Editor** ← This one!
   - Database
   - Auth
   - Storage

### Option 3: Quick Actions
Some Supabase dashboards have a "Quick Actions" or command palette:
- Press `Cmd+K` (Mac) or `Ctrl+K` (Windows)
- Type "SQL"
- Select "SQL Editor"

## Once You're in SQL Editor:

1. Click **"New Query"** button (usually green)
2. Copy and paste the entire contents of `supabase/setup-database.sql`
3. Click **"Run"** button (usually at the bottom or with a play icon ▶️)

## Visual Guide:

```
Supabase Dashboard Layout:
┌─────────────────────────────────────┐
│  [Logo]  Your Project Name          │
├──────┬──────────────────────────────┤
│      │                              │
│  📊  │     Main Content Area        │
│  📋  │                              │
│  📝  │ ← SQL Editor (click here!)   │
│  🗄️  │                              │
│  🔐  │                              │
│  💾  │                              │
│      │                              │
└──────┴──────────────────────────────┘
```

## Can't Find It?

If you still can't find the SQL Editor:
1. Make sure you're logged into Supabase
2. Make sure you've selected your project
3. Try refreshing the page
4. Look for any icon that mentions "SQL", "Query", or shows code brackets `{ }`

The SQL Editor is a core feature and should definitely be there!