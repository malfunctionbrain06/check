# Quick Start Guide - Gulabi Guiltz

Get up and running with the Gulabi Guiltz website in 5 minutes.

## Installation

```bash
# 1. Install dependencies
pnpm install

# 2. Run development server
pnpm dev

# 3. Open browser
# Visit http://localhost:3000
```

## What's New (Enhancements)

### 1. Animated Logo
The hero section now features a floating, animated logo with particles.
- Smooth up-down motion
- Subtle scale pulse
- Dreamy particle background

### 2. Product Showcase
Featured product section with WhatsApp inquiry button.
- **Current Product**: Mint Butterfly Clip (GG-001) - ₹299
- Click "Enquire" to open WhatsApp with prefilled message

### 3. WhatsApp Integration
Direct WhatsApp link for inquiries:
- Phone: +91 9921167992
- Prefilled message with product details
- Works on mobile (native app) and desktop (WhatsApp Web)

---

## Common Tasks

### Add a New Product

**File**: `lib/products.ts`

```typescript
{
  id: 'gg-002',
  name: 'Rose Beaded Earrings',
  code: 'GG-002',
  price: '₹399',
  description: 'Beautiful rose-inspired beaded earrings.',
  image: 'https://example.com/rose-earrings.jpg',
}
```

Product automatically appears on:
- Home page (if first product)
- Products page (in grid)

### Change Brand Colors

**File**: `app/globals.css`

```css
:root {
  --primary: #C97BA4;      /* Main pink */
  --secondary: #F7A8B8;    /* Light pink */
  --background: #FBF7F4;   /* Cream */
  --muted: #E8D5D0;        /* Beige */
}
```

### Update WhatsApp Number

**File**: `components/ProductCard.tsx`

```typescript
const whatsappPhone = '9921167992'; // Change this
```

Also update in:
- `components/Footer.tsx`

### Change Logo

1. Replace `/public/gulabi-logo.png` with your logo
2. Keep square aspect ratio (1:1)
3. Recommended size: 500x500px

---

## File Structure

```
📁 Components
├── AnimatedLogo.tsx          ← Floating hero logo
├── FloatingParticles.tsx     ← Background particles
├── ProductCard.tsx           ← Product cards
├── Navigation.tsx
└── Footer.tsx

📁 Pages
├── app/page.tsx              ← Home
├── app/about/page.tsx        ← About
├── app/products/page.tsx     ← Products
└── app/not-found.tsx         ← 404

📁 Data & Utils
├── lib/products.ts           ← Product data
└── app/globals.css           ← Colors & animations

📁 Docs
├── README.md                 ← Full documentation
├── PRODUCTS.md               ← Product guide
├── PERFORMANCE.md            ← Performance tips
└── ENHANCEMENTS.md           ← What's new
```

---

## Customization Tips

### Animation Speed
To make animations faster/slower, edit these files:

**Logo Animation** (`components/AnimatedLogo.tsx`):
```css
animation: float-up-down 4s ease-in-out infinite;  /* Change 4s */
```

**Particles** (`components/FloatingParticles.tsx`):
```typescript
duration: 6 + Math.random() * 4,  /* 6-10 seconds */
```

### Background Gradient
**File**: `app/page.tsx` (Hero section)

```tsx
<div className="bg-gradient-to-b from-[#FBF7F4] via-[#F5ECEB] to-[#E8D5D0]" />
```

Change hex values to customize.

### Button Styles
**File**: `components/ProductCard.tsx`

Default: Pink (`bg-[#C97BA4]`)
```tsx
className="bg-[#C97BA4] hover:bg-[#F7A8B8]"
```

---

## Testing

### Mobile Device
- Use Chrome DevTools device emulation
- Test WhatsApp link on actual mobile device
- Check responsive images

### Performance
```bash
# Build and test production version
pnpm build
pnpm start
```

Then open [http://localhost:3000](http://localhost:3000)

### Animations
Check 60fps performance:
1. Open DevTools (F12)
2. Go to Performance tab
3. Record while scrolling/interacting
4. Check FPS counter

---

## Deployment

### Vercel (Recommended)

```bash
# One-line deploy
vercel deploy

# Or connect GitHub for auto-deploy
# https://vercel.com/new
```

### Manual Build

```bash
pnpm build  # Creates .next folder
pnpm start  # Serves production build
```

---

## Troubleshooting

### Images not loading?
- Check image URL is accessible
- Verify CORS settings
- Use HTTPS URLs

### WhatsApp link not working?
- Check phone number format (+91 prefix optional)
- Test on actual mobile device
- Verify WhatsApp is installed

### Animations janky?
- Check FPS in DevTools
- Reduce number of particles (FloatingParticles.tsx)
- Enable GPU acceleration (already done)

### Build errors?
```bash
# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm build
```

---

## Key Features at a Glance

| Feature | Location | Status |
|---------|----------|--------|
| Animated Logo | Home page hero | ✅ Live |
| Floating Particles | Home page background | ✅ Live |
| Featured Product | Home page | ✅ Live |
| Product Cards | Home + Products page | ✅ Live |
| WhatsApp Integration | Product cards | ✅ Live |
| Instagram Link | Footer | ✅ Live |
| Responsive Design | All pages | ✅ Live |
| SEO Optimized | Metadata | ✅ Live |
| Performance Optimized | All | ✅ Live |

---

## Next Steps

1. **Customize Colors**: Edit `app/globals.css`
2. **Add Products**: Update `lib/products.ts`
3. **Update Contact**: Change phone in `ProductCard.tsx`
4. **Deploy**: Use Vercel or your hosting
5. **Monitor**: Use Vercel Analytics for insights

---

## Quick Links

- 📚 Full Docs: [README.md](./README.md)
- 🛍️ Products Guide: [PRODUCTS.md](./PRODUCTS.md)
- ⚡ Performance: [PERFORMANCE.md](./PERFORMANCE.md)
- ✨ What's New: [ENHANCEMENTS.md](./ENHANCEMENTS.md)

---

## Support

**For questions**: Check the documentation files above

**For WhatsApp support**: +91 9921167992

**For Instagram**: [@gulabi_guiltz](https://www.instagram.com/gulabi_guiltz/)

---

**Ready to launch? Run `pnpm dev` and start customizing!** 🚀
