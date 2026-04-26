# J🔍HNKEX - POLICE Website

A tactical-dark, police-inspired site to publish announcements, drive Discord recruitment, and showcase live server activity.

## 🎨 Visual Direction — Tactical Dark
- **Palette**: matte black `#0a0a0a` backgrounds, charcoal panels `#1a1a1a`, deep police blue `#1e3a8a`, siren red `#dc2626`
- **Vibe**: SWAT/tactical — sharp edges, monospace accents for "CASE FILE" / "DISPATCH" labels, subtle scanline & alert-strobe accents
- **Hero**: dark cinematic backdrop, glowing red/blue siren bar across the top, big magnifier-emoji wordmark **J🔍HNKEX – POLICE**, motto + two big CTAs (Contact / Apply)
- **Iconography**: shield, badge, radio, handcuff icons (lucide-react)
- **Typography**: bold condensed sans for headings ("law enforcement" feel), clean sans body, monospace for badge IDs/dates

## 🧭 Page Sections (single landing page)
1. **Top siren bar** — animated red↔blue pulse strip + emergency-style status ticker
2. **Hero** — wordmark, tagline, "Contact Us" + "Apply Now" buttons (both → `https://discord.gg/xNzX34pbX4`)
3. **Announcements** — "DISPATCH BOARD": cards with title, body, date, severity tag (Info / Alert / Critical). Public visitors read; admin can create/edit/delete
4. **About** — short mission statement, what J🔍HNKEX – POLICE is about
5. **Ranks / Divisions** — live from Discord: list of roles in your server (name, color, member count) pulled via bot
6. **Active Officers** — live from Discord: members grid (avatar, username, top role) — paginated/limited to keep it fast
7. **Rules & Requirements** — numbered list of server rules / application requirements
8. **Contact / Apply CTA footer** — repeated Discord buttons + footer

## 🔐 Admin Panel (announcements)
- `/auth` — email + password login (Lovable Cloud auth)
- `/admin` — protected route; only users with the `admin` role can access
- CRUD UI for announcements: title, body (markdown-light), severity, publish toggle
- Roles stored in a separate `user_roles` table with a `has_role()` security-definer function (no privilege-escalation risk)
- After you sign up your first account, I'll grant it the `admin` role so you can post immediately

**Data model (Lovable Cloud)**
- `announcements` — id, title, body, severity, published, created_at, author_id
- `user_roles` — id, user_id, role (`admin` | `user`)
- RLS: anyone can read published announcements; only admins can insert/update/delete

## 🤖 Discord Live Integration (bot-based)
- You'll create a Discord bot at https://discord.com/developers/applications, enable **Server Members Intent**, invite it to your server with `View Channels` + `View Server Members` permissions, then give me the **bot token**
- I'll store it as a secret and build two edge functions:
  - `discord-roles` — fetches roles from your guild (name, color, member count)
  - `discord-members` — fetches member list (avatar, username, highest role, online status if available)
- Frontend caches results (React Query, ~60s) so we don't hammer Discord's API
- The two CTA buttons stay as direct invite links to `https://discord.gg/xNzX34pbX4`

## 🔗 What you'll need to provide after approval
1. Sign up on the site (email + password) so I can promote you to admin
2. Your Discord **Server (Guild) ID** — right-click your server icon in Discord → Copy Server ID (Developer Mode must be on)
3. A Discord **bot token** — I'll walk you through creating the bot when we get there

## 🚫 Out of scope (for now)
- No live chat / message mirroring from Discord
- No per-user Discord OAuth (users don't log in with Discord)
- No mobile app — responsive web only

Once approved, I'll build the UI + admin panel first, then wire up the Discord bot integration.