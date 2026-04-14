# Website Architecture & Structure

## Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    GULABI GUILTZ WEBSITE                    │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
          ┌─────▼─────┐           ┌────────▼──────┐
          │   Layout  │           │   Global CSS  │
          │(layout.tsx)           │ (globals.css) │
          └─────┬─────┘           └────────┬──────┘
                │                          │
    ┌───────────┴──────────┬──────────────┘
    │                      │
    │              ┌──────────────────┐
    │              │  Color Palette   │
    │              │  & Animations    │
    │              └──────────────────┘
    │
    ├─────────────────────────────────────────┐
    │                                         │
    ▼                                         ▼
┌──────────────┐                     ┌────────────────┐
│  Pages       │                     │  Components    │
├──────────────┤                     ├────────────────┤
│ • Home       │◄────────────────────┤ • Navigation   │
│ • About      │                     │ • Footer       │
│ • Products   │                     │ • AnimatedLogo │
│ • 404        │                     │ • ParticlesBkg │
└──────────────┘                     │ • ProductCard  │
      │                              └────────────────┘
      │
      └──────────────────┬───────────────────┘
                         │
                    ┌────▼─────┐
                    │   Data    │
                    ├───────────┤
                    │ products  │
                    │   .ts     │
                    └───────────┘
```

## Directory Structure

```
gulabi-guiltz/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (metadata, fonts)
│   ├── globals.css              # Global styles & animations
│   ├── page.tsx                 # Home page
│   ├── about/
│   │   └── page.tsx             # About page
│   ├── products/
│   │   └── page.tsx             # Products page
│   └── not-found.tsx            # 404 error page
│
├── components/                   # Reusable React components
│   ├── Navigation.tsx           # Header navigation (sticky)
│   ├── Footer.tsx               # Footer with contact links
│   ├── AnimatedLogo.tsx         # Floating animated logo
│   ├── FloatingParticles.tsx    # Background particle animation
│   └── ProductCard.tsx          # Product display card
│
├── lib/                         # Utilities & data
│   └── products.ts              # Product data structure & functions
│
├── public/                      # Static assets
│   ├── gulabi-logo.png         # Brand logo
│   └── api/
│       └── placeholder.ts       # Image placeholder helpers
│
├── Documentation/
│   ├── README.md                # Full documentation
│   ├── QUICKSTART.md            # Quick setup guide
│   ├── PRODUCTS.md              # Product management
│   ├── PERFORMANCE.md           # Performance guide
│   ├── ENHANCEMENTS.md          # What's new
│   ├── ARCHITECTURE.md          # This file
│   └── IMPLEMENTATION_SUMMARY.txt # Project summary
│
├── package.json                 # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS (Implicit v4)
└── next.config.mjs             # Next.js configuration
```

## Component Hierarchy

```
┌─ RootLayout ────────────────────────────────┐
│  ├─ Metadata (title, description, etc)     │
│  ├─ Fonts (Geist, Geist Mono)             │
│  └─ Analytics (Vercel)                     │
│                                             │
│  └─ Children (Routes)                      │
│      │                                      │
│      ├─ Home Page (/)                      │
│      │   ├─ Navigation                     │
│      │   ├─ Hero Section                   │
│      │   │   ├─ AnimatedLogo               │
│      │   │   ├─ FloatingParticles          │
│      │   │   └─ Gradient Background        │
│      │   ├─ Featured Product               │
│      │   │   └─ ProductCard                │
│      │   ├─ Collections                    │
│      │   ├─ CTA Section                    │
│      │   └─ Footer                         │
│      │                                      │
│      ├─ About Page (/about)                │
│      │   ├─ Navigation                     │
│      │   ├─ Story Section                  │
│      │   ├─ Values Section                 │
│      │   ├─ CTA Section                    │
│      │   └─ Footer                         │
│      │                                      │
│      ├─ Products Page (/products)          │
│      │   ├─ Navigation                     │
│      │   ├─ Hero Section                   │
│      │   ├─ Product Grid                   │
│      │   │   ├─ ProductCard (n)            │
│      │   │   └─ ProductCard (n)            │
│      │   ├─ Newsletter Section             │
│      │   └─ Footer                         │
│      │                                      │
│      └─ 404 Page (*)                       │
│          ├─ Navigation                     │
│          ├─ Error Content                  │
│          └─ Footer                         │
│                                             │
└─────────────────────────────────────────────┘
```

## Data Flow

```
Products Data (lib/products.ts)
    │
    └─► getProducts()
        │
        ├─► Used in: Home Page
        │   └─► Displays: Featured Product (first item)
        │       └─► Component: ProductCard
        │
        ├─► Used in: Products Page
        │   └─► Displays: All Products Grid
        │       └─► Components: ProductCard (multiple)
        │
        └─► Used in: APIs
            └─► Can be replaced with: CMS/Backend API
```

## Component Data Flow

```
Home Page (page.tsx)
    │
    ├─► Imports: getProducts()
    │   └─► Returns: Product[]
    │
    ├─► Renders: AnimatedLogo
    │   └─► Props: None (self-contained)
    │
    ├─► Renders: FloatingParticles
    │   └─► Props: None (self-contained)
    │
    └─► Renders: ProductCard
        └─► Props: Product (destructured)
            ├─► name: String
            ├─► code: String
            ├─► price: String
            ├─► description: String
            └─► image: String (URL)
                └─► Generates: WhatsApp Link
                    └─► https://wa.me/{phone}?text={message}
```

## Styling Architecture

```
app/globals.css (Single Source of Truth)
    │
    ├─► CSS Custom Properties (Color Palette)
    │   ├─► --primary: #C97BA4
    │   ├─► --secondary: #F7A8B8
    │   ├─► --background: #FBF7F4
    │   └─► --muted: #E8D5D0
    │
    ├─► Tailwind Configuration (@theme)
    │   ├─► Font families
    │   ├─► Color tokens
    │   └─► Spacing scale
    │
    └─► Keyframe Animations
        ├─► @keyframes fadeIn
        ├─► @keyframes float-up-down
        ├─► @keyframes pulse-glow
        └─► @keyframes float
```

## Animation Architecture

```
CSS Animations (GPU-Optimized)
    │
    ├─► logo-float-up-down (4s)
    │   └─► Transform: translateY (no performance impact)
    │
    ├─► logo-subtle-scale (3.5s)
    │   └─► Transform: scale (GPU-accelerated)
    │
    ├─► particle-float (6-10s)
    │   ├─► Transform: translateY + translateX
    │   └─► Opacity: fade
    │
    ├─► particle-pulse-glow (6-10s)
    │   ├─► Transform: scale
    │   └─► Opacity: pulse
    │
    └─► Hover Effects
        ├─► ProductCard: scale 1.05
        ├─► Buttons: scale 1.05
        └─► Links: underline + color

Accessibility: prefers-reduced-motion
    └─► Disables all animations
```

## Product Architecture

```
lib/products.ts
    │
    ├─► interface Product
    │   ├─► id: string
    │   ├─► name: string
    │   ├─► code: string
    │   ├─► price: string
    │   ├─► description: string
    │   ├─► image: string
    │   └─► category?: string
    │
    ├─► sampleProducts: Product[]
    │   └─► [Mint Butterfly Clip (GG-001)]
    │
    ├─► getProducts(): Product[]
    │   └─► Returns sampleProducts
    │       (Can be replaced with API call)
    │
    └─► getProductById(id): Product | undefined
        └─► Finds product by ID
```

## WhatsApp Integration

```
ProductCard Component
    │
    ├─► Phone: '9921167992'
    │
    ├─► Message Template:
    │   "Hi !! I wanted to know about buying {name} 
    │    (Code: {code}). My name is ____ and my 
    │    contact number is ____."
    │
    ├─► Encoding: encodeURIComponent()
    │   └─► Converts to: URL-safe string
    │
    ├─► Link Generation:
    │   └─► https://wa.me/{phone}?text={encoded_message}
    │
    └─► Button Click:
        ├─► Mobile: Opens WhatsApp native app
        └─► Desktop: Opens WhatsApp Web
```

## Responsive Design Architecture

```
Mobile-First Approach
    │
    ├─ Base Styles (Mobile < 640px)
    │  ├─ Single column layouts
    │  ├─ Full-width components
    │  ├─ Touch-friendly sizes (44x44px)
    │  └─ Optimized animations
    │
    ├─ Tablet (640-1024px)
    │  ├─ 2-3 column grids
    │  ├─ Adjusted spacing
    │  └─ Improved navigation
    │
    └─ Desktop (> 1024px)
       ├─ Full feature layouts
       ├─ 3+ column grids
       └─ Advanced interactions
```

## SEO Architecture

```
Metadata (layout.tsx)
    │
    ├─► Page Title
    │   └─ "Gulabi Guiltz - Handcrafted Beaded Jewelry & Crochet"
    │
    ├─► Meta Description
    │   └─ "Discover whimsical handcrafted beaded jewelry..."
    │
    ├─► Keywords
    │   └─ "beaded jewelry, crochet, handmade, whimsical"
    │
    ├─► Open Graph Tags
    │   ├─ og:title
    │   ├─ og:description
    │   └─ og:type: website
    │
    └─► Canonical URL
        └─ metadataBase: vercel.app
```

## Deployment Architecture

```
Development
    └─► pnpm dev (localhost:3000)

Production Build
    ├─► pnpm build
    │   └─► Creates .next/ folder
    │
    └─► pnpm start
        └─► Serves optimized build

Deployment Targets
    ├─► Vercel (Recommended)
    │   └─► Auto-deployment from Git
    │
    └─► Any Node.js Host
        └─► Manual build & deploy
```

## Performance Architecture

```
Image Optimization
    ├─► Next.js Image Component
    ├─► Automatic format conversion
    ├─► Lazy loading
    └─► Responsive sizing

Animation Performance
    ├─► CSS-based (GPU-accelerated)
    ├─► Transform + Opacity only
    ├─► No JavaScript animations
    └─► 60fps target

Bundle Optimization
    ├─► Tree-shaking enabled
    ├─► Code splitting
    └─► Minimal dependencies

Caching Strategy
    ├─► Static pages pre-rendered
    ├─► Image caching headers
    └─► CDN optimization ready
```

## Extension Points (Future Integration)

```
CMS Integration
    └─► Replace getProducts() with API call
        ├─► Sanity CMS
        ├─► Contentful
        ├─► Strapi
        └─► Custom API

Payment Processing
    └─► Add payment integration
        ├─► Razorpay
        ├─► Stripe
        └─► PayPal

User Accounts
    └─► Add authentication
        ├─► NextAuth.js
        ├─► Supabase Auth
        └─► Custom Auth

Analytics
    └─► Enhance tracking
        ├─► Google Analytics 4
        ├─► Hotjar
        └─► Custom events
```

---

This architecture is designed for:
- **Scalability**: Easy to add new features
- **Maintainability**: Clear separation of concerns
- **Performance**: Optimized for web
- **Accessibility**: Built-in standards compliance
- **Security**: No hardcoded secrets
