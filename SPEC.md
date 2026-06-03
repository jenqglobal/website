# JenQ Global Solutions - Website Specification

## Project Overview
- **Project Name**: JenQ Global Solutions Website
- **Type**: Full-stack web application with CMS
- **Core Functionality**: Business website with comprehensive admin panel for content management, subscription billing, and customizable theming
- **Target Users**: Small/medium business owners seeking ongoing tech partnership
- **Status**: Production-ready

## Tech Stack
- **Frontend**: React 18 with Vite, TypeScript, TailwindCSS
- **Backend**: Node.js with Express
- **Database**: SQLite with better-sqlite3
- **Payment**: Stripe integration
- **Authentication**: JWT-based admin auth
- **UI Library**: Framer Motion, Lucide React icons

## UI/UX Specification

### Theme System
Full dark/light mode support with smooth transitions across the entire website.

**Dark Mode (Default)**
- **Background**: `#0a0a0f`
- **Surface/Cards**: `rgba(255,255,255,0.05)`
- **Text Primary**: `#ffffff`
- **Text Secondary**: `rgba(255,255,255,0.6)`
- **Border**: `rgba(255,255,255,0.08)`

**Light Mode**
- **Background**: `#f8fafc`
- **Surface/Cards**: `rgba(255,255,255,0.95)`
- **Text Primary**: `#0f172a`
- **Text Secondary**: `#64748b`
- **Border**: `rgba(0,0,0,0.08)`

### Color Palette
- **Primary**: `#3B82F6` (Bright Blue)
- **Secondary**: `#10B981` (Emerald Green)
- **Accent**: `#8B5CF6` (Purple)
- **Success**: `#34D399`
- **Warning**: `#F59E0B`

### Typography
- **Headings**: Plus Jakarta Sans with bold weight
- **Body**: Inter with regular weight
- **Hero Title**: clamp(2.5rem, 5vw, 4rem)
- **Section Title**: clamp(2rem, 4vw, 3rem)
- **Subtitle**: 1.25rem
- **Body**: 16px
- **Small**: 14px

### Design System
- Glass morphism effect with backdrop blur
- Gradient orbs for visual interest
- Theme-aware animated background
- Consistent spacing: 24px/32px gaps, 100px section padding
- Rounded corners: 12px-16px for cards, 8px-10px for buttons
- Premium header with scroll effects and animations

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Page Structure

### 1. Home Page
**Hero Section**
- Headline: "Your Ongoing Tech & Growth Partner"
- Subheadline: "We maintain, improve, and guide your systems every month."
- CTA Button: "Book Free Audit"
- Stats: 500+ Businesses, 99.9% Uptime, 24/7 Support, 5+ Years

**Value Proposition Section**
- 4 feature cards: Proactive Security, Instant Response, Continuous Growth, Dedicated Support

**How It Works Section**
- 4-step process: Free Audit → Strategy → Onboarding → Partnership

**Testimonials Section**
- 3 client testimonials with photos

**CTA Section**
- "Ready to Transform Your Business?"

### 2. About Us Page
**Hero**: "Meet the Founders"
**Founders Section**: Jonathan Chen (CEO), Qiang Patel (CTO)
**Values**: Genuine Care, Trust & Transparency, Accountability, Long-Term Partnership
**Comparison**: Typical Agency vs JenQ Global

### 3. Services Page
**Hero**: "Comprehensive Tech Solutions"
**Benefits Bar**: 99.9% Uptime, 24/7 Monitoring, Fast Response, Scalable Solutions
**Services Grid**: 6 service cards
**How It Works**: 4-step process
**CTA**: "Need a Custom Solution?"

### 4. Industries We Serve Page
**Hero**: "Industries We Serve"
**Industry Cards**: Medical & Dental, Retail & E-commerce, Consultants & Coaches, Service Businesses, Professional Services, Non-profits

### 5. Problems We Solve Page
**Hero**: "Problems We Solve"
**Problem Cards**: 6 problem/solution pairs
**Solution Section**: Monthly Partnership benefits

### 6. Pricing Page
**Hero**: "Simple, Transparent Pricing"
**Pricing Cards**: Starter ($297), Professional ($497), Enterprise ($997)
**What's Included**: 9 common features
**FAQ Section**: Expandable questions

### 7. Blog Page
**Hero**: "Practical Wisdom"
**Featured Post**: Large featured article
**Recent Articles**: Grid of blog cards
**Categories**: Technology, Growth, Security, Case Studies

### 8. Contact Page
**Hero**: "Start a Conversation"
**Contact Form**: Name, email, phone, company, message, preferred contact
**Contact Info**: Email, phone, business hours
**What Happens Next**: 3-step process

## Shared Components

### Header (Header.tsx)
Premium navigation with:
- Animated gradient logo
- Desktop navigation with active state indicators
- Theme toggle (sun/moon icons)
- Book Free Audit CTA with sparkle icon
- Scroll-aware styling (shadow appears on scroll)
- Smooth mobile menu with animations
- Glass morphism effect with backdrop blur

### Footer (Footer.tsx)
- Logo and company info
- Company links with hover effects
- Contact information with icons
- Social media links from settings
- Copyright with dynamic year

### AuditModal (AuditModal.tsx)
- Popup modal for Book Free Audit form
- Professional styling with glass effect
- Form fields: name, email, phone, website, challenge

## Admin Panel Features

### Authentication
- Login page with dark theme
- JWT token-based session
- Protected admin routes

### Dashboard
- Overview statistics
- Recent inquiries
- Active subscriptions

### Settings Manager
- Site name, logo upload, favicon upload
- Color customization
- Contact information
- Social media links
- Hero content settings

### Content Management
- Pages Editor with SEO fields
- Blog Manager (CRUD)
- Inquiries Manager
- Subscriptions Manager

## Implementation Notes

### Theme System
- Theme toggle persists to localStorage
- CSS variables enable smooth transitions
- data-theme attribute on document root
- All components use theme-aware styles

### Header Features
- Scroll detection for shadow effect
- Active navigation highlighting
- Smooth animations on hover
- Mobile-responsive hamburger menu

### Build Status
- Build succeeded
- No errors
- Minor chunk size warning (acceptable)

## Acceptance Criteria

### Visual
- [x] All pages match design specifications
- [x] Responsive on all breakpoints
- [x] Smooth animations and transitions
- [x] Consistent color scheme
- [x] Professional, modern appearance
- [x] Glass morphism effects throughout
- [x] Premium header with scroll effects
- [x] Consistent header/footer across all pages
- [x] Dark/light mode toggle works site-wide

### Functionality
- [x] All pages render correctly
- [x] Contact form submits and saves
- [x] Admin login works
- [x] Logo upload functional
- [x] Favicon upload functional
- [x] Blog posts can be CRUD
- [x] Theme preference persists
- [x] Book Free Audit modal works

### Performance
- [x] Fast page loads
- [x] No console errors
- [x] Production build successful