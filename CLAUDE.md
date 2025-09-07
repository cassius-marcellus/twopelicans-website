# Claude Code Instructions

## CRITICAL RULES (ALWAYS FOLLOW)
- NEVER edit a file without reading it first - use Read tool
- NEVER assume a library/package exists - verify in package.json, requirements.txt, or Cargo.toml first
- NEVER guess versions, APIs, or commands - search for or verify them
- If uncertain about anything, say "I need to check" and investigate
- When date/time matters, run `date` command to verify current date
- For web documentation, search for "2024" or "2025" versions, not outdated docs

## Global Preferences
### Code Practices
- Prefer editing existing files over creating new ones
- Follow existing code style and conventions in the project
- No comments unless explicitly requested
- No emojis in code unless explicitly requested

### Git Practices  
- NEVER push or commit unless explicitly asked
- Use descriptive commit messages
- Always run `git status` before committing
- Include co-author attribution in commits
- GitHub CLI authenticated (gh commands available)

### Testing & Validation
- After code changes, run lint/typecheck if available
- Ask for test/lint commands if not found in package.json or Makefile
- Verify changes work before marking task complete

### Communication
- Be concise - max 4 lines of explanation unless asked for more
- Show, don't tell - demonstrate with code/commands
- One task at a time - mark complete before moving to next
- Use file_path:line_number format when referencing code

## Project-Specific Information
<!-- CUSTOMIZE THIS SECTION PER PROJECT -->

### Tech Stack
- Language: TypeScript/JavaScript
- Framework: Next.js 14 (App Router) - for SEO, performance, and modern React features
- Styling: Tailwind CSS + shadcn/ui components
- Database: PostgreSQL (Supabase for auth, data, and real-time features)
- Hosting: Vercel (seamless Next.js deployment)
- Domain: Porkbun (twopelicans.ai)
- Package Manager: npm
- Analytics: Vercel Analytics + Google Analytics
- Email: Resend API for contact forms and notifications

### Commands
```bash
# Install dependencies
npm install

# Run development
npm run dev

# Run tests
npm test

# Lint/Format
npm run lint
npm run format

# Build
npm run build

# Production preview
npm run start
```

### Project Context
TwoPelicans.ai - Professional website for our AI consulting firm targeting medium to large enterprise clients.
Key features: Service showcase, case studies, team expertise, contact forms, blog/insights, client portal.
Must convey trust, innovation, and technical excellence while remaining accessible to non-technical executives.

### Global Tools Available
- **Email System**: Can send emails via ~/code/claude_testing/src/email_sender.py (from assistant@twopelicans.ai)
- **Shortcuts**: Type 'cs' to see all shortcuts (configured in ~/.claude_shortcuts)
- **Quick commands**: send-email, test-email, setup-project, status

### Claude Code Workflow Commands
- **claude-start**: Show workflow guide (auto-displays on terminal start)
- **claude-copy**: Copy this template to create local CLAUDE.md
- **claude-context**: Prompt Claude to read all project context files
- **claude-edit**: Edit local CLAUDE.md file
- **session-notes**: Document session work (quick mode or interactive editor)

### Recommended Workflow
1. **New Project Setup**:
   - Run `claude-copy` to create CLAUDE.md from this template
   - Edit CLAUDE.md to add project-specific details
   - Run `claude-context` to load context into Claude
   - Start working!

2. **Resume Existing Project**:
   - Run `claude-context` to reload all context
   - Continue where you left off

3. **End Session**:
   - Run `session-notes` to document what was done
   - This helps with context for next session

### Project-Specific Rules
- Professional tone - this represents our business to enterprise clients
- Accessibility is critical - WCAG 2.1 AA compliance minimum
- Performance matters - Core Web Vitals must be excellent
- Mobile-first responsive design is mandatory
- All forms must have proper validation and security
- SEO optimization for all public pages
- Use real content, no Lorem Ipsum or placeholders
- Implement proper error handling and loading states
- Follow Next.js 14 App Router best practices

## DO NOT
- Create documentation files unless explicitly requested
- Add TODO comments without permission  
- Refactor working code without being asked
- Install new dependencies without approval
- Modify git configuration
- Create example or test files unless requested