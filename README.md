# TwoPelicans.ai Website & Client Portal

Professional AI consulting website with secure client portal for TwoPelicans AI.

**Live at:** https://twopelicans.ai

## Features

### Public Website
- Professional AI consulting homepage
- Services showcase (6 core offerings)
- About page with company messaging
- Blog section with thought leadership
- Insights page for industry analysis
- Contact form with email integration

### Client Portal (/portal)
- Secure authentication (Supabase Auth)
- Client dashboard with metrics
- Resource downloads
- Meeting schedules
- Messaging system with email notifications
- Admin panel for client management

### Hidden Family Section (/family)
- Kid-friendly games area
- Axolotl Runner game
- Not linked from main site

## Tech Stack

- **Framework:** Next.js 15.5.2 (App Router + Turbopack)
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL (Supabase)
- **Authentication:** Supabase Auth (JWT, bcrypt)
- **Hosting:** Vercel
- **Email:** Resend API
- **Domain:** twopelicans.ai (Porkbun)
- **Analytics:** Google Analytics 4

## Development

### Prerequisites
```bash
# Required environment variables in .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
EMAIL_TO=ray@twopelicans.ai
EMAIL_FROM=hello@send.twopelicans.ai
```

### Installation
```bash
npm install
```

### Running locally
```bash
npm run dev
```

### Building for production
```bash
npm run build
npm run start
```

## Portal User Management

### Creating Users (CLI - Most Reliable)
```bash
node scripts/portal-admin.js create --email user@example.com --company "Company Name"
```

### Other CLI Commands
```bash
# List all users
node scripts/portal-admin.js list

# Verify user setup
node scripts/portal-admin.js verify --email user@example.com

# Delete user
node scripts/portal-admin.js delete --email user@example.com
```

### Admin Panel
Access at: https://twopelicans.ai/portal/admin

## Development Principles

### CRITICAL: Code Quality Rules
- **NEVER downgrade functionality to fix bugs** - if a dependency is missing, install it
- **NEVER disable features to work around issues** - maintain or improve robustness
- **Always preserve existing features** when implementing fixes
- **Discuss any functionality changes** with stakeholders before implementing

### Best Practices
- Mobile-first responsive design
- WCAG 2.1 AA accessibility compliance
- Excellent Core Web Vitals performance
- Proper error handling and loading states
- Real content only (no Lorem Ipsum)
- Enterprise-grade security

## Project Structure

```
/app                  # Next.js App Router pages
  /api               # API endpoints
  /portal            # Client portal pages
    /admin          # Admin dashboard
    /dashboard      # Client dashboard
/components          # React components
/lib                # Utilities and helpers
/public             # Static assets
  /family           # Hidden family games
/scripts            # Admin tools
  portal-admin.js   # User management CLI
/docs               # Documentation
```

## Documentation

- [Portal User Management Guide](docs/PORTAL_USER_MANAGEMENT.md)
- [Claude AI Instructions](CLAUDE.md)
- [Session Notes](SESSION_NOTES.md)

## Security

- Supabase Row-Level Security (RLS) policies
- bcrypt password hashing
- JWT token authentication
- Secure password reset flow
- Environment variables for secrets

## Support

For issues or questions about the portal, refer to the documentation or contact the development team.

---

**Deployed & Maintained by TwoPelicans AI**
Enterprise AI Solutions • https://twopelicans.ai