# Gulabi Guiltz - Handcrafted Beaded Jewelry & Crochet

A beautiful, production-ready Next.js website for Gulabi Guiltz, featuring handcrafted beaded jewelry and crochet accessories with WhatsApp integration for inquiries.

## Features

### 🎨 Design & UI
- **Soft, Whimsical Aesthetic**: Cream and pink color palette with glassmorphism effects
- **Animated Logo**: Smooth floating animation with subtle scale pulse
- **Floating Particles**: Dreamy background with gently floating beads and particles
- **3D Gradient Background**: Layered depth effect without heavy animations
- **Responsive Design**: Mobile-first, fully responsive on all devices

### 🛍️ E-Commerce Ready
- **Product Showcase**: Beautiful product cards with images and descriptions
- **WhatsApp Integration**: One-click purchase inquiry with prefilled messages
- **Dynamic Product Structure**: Backend-ready for easy product management
- **Featured Products**: Spotlight section on home page

### 📱 Platform Optimization
- **Mobile Priority**: Touch-friendly interface and optimized performance
- **WhatsApp Direct**: Opens WhatsApp Web on desktop, native app on mobile
- **Instagram Integration**: Social media links in footer
- **Fast Loading**: Optimized animations and images

### ⚡ Performance
- **Optimized Animations**: CSS-based, GPU-accelerated
- **Image Optimization**: Next.js Image component with lazy loading
- **Bundle Optimization**: Minimal dependencies, no heavy libraries
- **Accessibility**: WCAG AA compliant, respects prefers-reduced-motion

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Images**: Next.js Image with optimization
- **Analytics**: Vercel Analytics
- **Hosting**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd gulabi-guiltz

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── globals.css          # Global styles and animations
│   ├── page.tsx             # Home page
│   ├── about/
│   │   └── page.tsx         # About page
│   ├── products/
│   │   └── page.tsx         # Products page
│   └── not-found.tsx        # 404 page
├── components/
│   ├── Navigation.tsx       # Top navigation
│   ├── Footer.tsx          # Footer with contact links
│   ├── AnimatedLogo.tsx    # Floating animated logo
│   ├── FloatingParticles.tsx # Background particle animation
│   └── ProductCard.tsx     # Reusable product card component
├── lib/
│   └── products.ts         # Product data and utilities
└── public/
    └── gulabi-logo.png     # Brand logo
```

## Key Components

### AnimatedLogo
Renders a floating, animated logo with subtle scale and vertical movement.

```tsx
<AnimatedLogo />
```

### FloatingParticles
Creates dreamy background particles with smooth floating animations.

```tsx
<FloatingParticles />
```

### ProductCard
Displays a product with image, description, price, and WhatsApp inquiry button.

```tsx
<ProductCard
  id="gg-001"
  name="Mint Butterfly Clip"
  code="GG-001"
  price="₹299"
  description="A soft handcrafted butterfly..."
  image="https://..."
/>
```

## Configuration

### WhatsApp Integration
- **Phone Number**: +91 9921167992 (configured in ProductCard.tsx)
- **Message Format**: Prefilled with product details and user prompt
- **Behavior**: Opens WhatsApp Web (desktop) or native app (mobile)

### Brand Colors
- **Primary Pink**: #C97BA4
- **Secondary Pink**: #F7A8B8
- **Cream Background**: #FBF7F4
- **Beige Accent**: #E8D5D0

### Logo & Assets
- Logo location: `/public/gulabi-logo.png`
- Replace with your own logo (keep square aspect ratio for best results)

## Adding Products

See [PRODUCTS.md](./PRODUCTS.md) for detailed instructions on adding new products.

Quick start:
1. Edit `lib/products.ts`
2. Add to `sampleProducts` array
3. Product automatically appears on Products page

Example:
```typescript
{
  id: 'gg-002',
  name: 'Rose Beaded Earrings',
  code: 'GG-002',
  price: '₹399',
  description: 'Delicate rose-inspired beaded earrings...',
  image: 'https://your-image-url.com/rose.jpg',
}
```

## Customization

### Colors
Edit CSS variables in `app/globals.css`:
```css
:root {
  --primary: #C97BA4;
  --secondary: #F7A8B8;
  --background: #FBF7F4;
}
```

### Animations
Modify animation timing in component files (duration in seconds):
- Logo float: 4s (in AnimatedLogo.tsx)
- Scale pulse: 3.5s (in AnimatedLogo.tsx)
- Floating particles: 6-10s (in FloatingParticles.tsx)

### Content
- **Homepage**: `app/page.tsx`
- **About**: `app/about/page.tsx`
- **Products**: `app/products/page.tsx`
- **Navigation**: `components/Navigation.tsx`
- **Footer**: `components/Footer.tsx`

## Performance Optimization

See [PERFORMANCE.md](./PERFORMANCE.md) for detailed optimization guide including:
- Image optimization strategies
- Animation performance tuning
- Mobile optimization tips
- Accessibility compliance

## Deployment

### Deploy to Vercel (Recommended)

```bash
vercel deploy
```

### Build for Production

```bash
pnpm build
pnpm start
```

## Social Integration

### Instagram
- Link: https://www.instagram.com/gulabi_guiltz/
- Located in footer

### WhatsApp
- Phone: +91 9921167992
- Used for product inquiries
- Integrated in ProductCard component

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Respects system motion preferences

## SEO

- Optimized metadata in `layout.tsx`
- Semantic HTML structure
- Open Graph tags for social sharing
- Mobile-friendly viewport configuration
- Fast page load times

## License

This project is proprietary to Gulabi Guiltz.

## Support

For issues or questions, contact:
- WhatsApp: +91 9921167992
- Instagram: @gulabi_guiltz

---

**Built with ❤️ using Next.js and Tailwind CSS**
