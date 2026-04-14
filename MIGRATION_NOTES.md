# Migration: Static to Dynamic Products System

## What Changed

### Before (Static)
- Products were hardcoded in `lib/products.ts`
- To add a product, you had to:
  1. Edit the code file
  2. Rebuild the project
  3. Redeploy
- No database, no persistence

### After (Dynamic)
- Products stored in MongoDB database
- Add products via API request (no code changes needed)
- Changes appear immediately
- Scalable and production-ready

---

## Files Created

### Backend (Database & API)
```
lib/db.ts                          - MongoDB connection with caching
lib/models/Product.ts              - Mongoose schema & model
lib/validations/product.ts         - Zod validation schema
app/api/products/route.ts          - GET/POST API endpoints
```

### Frontend (Components & Hooks)
```
hooks/useProducts.ts               - React hook for data fetching
components/ProductsGrid.tsx        - Product grid with loading states
```

### Configuration & Documentation
```
.env.example                       - Environment variables template
SETUP_MONGODB.md                   - Step-by-step setup guide
API_REFERENCE.md                   - API documentation
MIGRATION_NOTES.md                 - This file
```

---

## Files Modified

### app/page.tsx (Home Page)
**Removed:**
- `import { getProducts } from '@/lib/products'`
- `const products = getProducts()`
- Static product display in featured section

**Changed:**
- Featured product section now shows placeholder
- Future: can use `useProducts` hook for dynamic display

### app/products/page.tsx (Products Page)
**Changed:**
- Replaced static grid with `<ProductsGrid />` component
- Component handles loading, error, and empty states automatically
- Products update in real-time as new items are added to database

### next.config.mjs
**Removed:**
```javascript
typescript: {
  ignoreBuildErrors: true,
}
```
- Now enforces proper TypeScript compilation

---

## Database Schema

```typescript
interface IProduct extends Document {
  name: string;              // Product name (required)
  code: string;              // Unique product code (required)
  price: string;             // Price string (e.g., "₹299")
  description: string;       // Product description (required)
  image: string;             // Image URL (required)
  category?: string;         // Optional category
  createdAt: Date;           // Auto-set by MongoDB
  updatedAt: Date;           // Auto-set by MongoDB
}
```

---

## API Endpoints Available

### GET /api/products
Fetch all products
```bash
curl http://localhost:3000/api/products
```

### POST /api/products
Create new product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "...","code": "...", ...}'
```

---

## How to Use

### 1. Setup MongoDB
Follow `SETUP_MONGODB.md` for complete instructions

### 2. Add Environment Variable
Create `.env.local`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gulabi-guiltz?retryWrites=true&w=majority
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Add Products
Use the API to add products:
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mint Butterfly Clip",
    "code": "GG-001",
    "price": "₹299",
    "description": "A soft handcrafted butterfly clip made with love and precision.",
    "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    "category": "Hair Accessories"
  }'
```

### 5. View Products
Visit http://localhost:3000/products
Products appear automatically from database

---

## Old Static Data (Kept for Reference)

The original `lib/products.ts` is still in the project but no longer used. You can:
- Delete it if you don't need it: `rm lib/products.ts`
- Keep it as a backup for sample data
- Import sample products to populate database initially

---

## Validation

All product fields are validated using Zod:

| Field | Min | Max | Required |
|-------|-----|-----|----------|
| name | 1 | 100 | ✅ |
| code | 1 | 50 | ✅ |
| price | - | - | ✅ |
| description | 10 | 500 | ✅ |
| image | - | - | ✅ (valid URL) |
| category | - | 50 | ❌ |

Invalid requests return 400 with detailed error messages.

---

## Error Handling

### Connection Errors
If MongoDB is not accessible, API returns 500 error.
Check:
- MongoDB cluster is running
- Connection string is correct in `.env.local`
- IP address is whitelisted in MongoDB Atlas

### Duplicate Code
If code already exists, API returns 409 (Conflict).
Solution: Use unique code for each product

### Validation Errors
If required fields are missing, API returns 400 (Bad Request).
Check field requirements in API documentation.

---

## Frontend Components

### useProducts Hook
```typescript
import { useProducts } from '@/hooks/useProducts';

function MyComponent() {
  const { products, loading, error, refetch } = useProducts();
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div>
      {products.map(p => (
        <ProductCard key={p._id} {...p} />
      ))}
    </div>
  );
}
```

### ProductsGrid Component
```typescript
import { ProductsGrid } from '@/components/ProductsGrid';

export default function Products() {
  return <ProductsGrid />;
}
```

---

## Security Notes

### Current Setup (Development)
- ✅ No authentication required
- ✅ Works for public products
- ✅ Anyone can add products via API

### For Production
Add these:
1. **API Key Authentication** - Protect POST endpoint
2. **Admin Dashboard** - Only admins can add products
3. **Rate Limiting** - Prevent API abuse
4. **Input Sanitization** - Already done with Zod validation
5. **HTTPS Only** - Use secure connections

---

## Performance

### Optimizations Included
- MongoDB connection caching (avoid reconnections)
- Proper indexing on `code` field (unique)
- React hooks for efficient re-renders
- Image lazy loading with Next.js Image component

### Future Improvements
- Add caching layer (Redis)
- Implement pagination for large product lists
- Add product search/filtering
- Optimize image storage (Vercel Blob)

---

## Troubleshooting

### "MONGODB_URI not defined"
Solution: Create `.env.local` with your MongoDB connection string

### "Product with this code already exists"
Solution: Use unique product codes (GG-001, GG-002, etc.)

### "Products page shows 'Coming Soon'"
Solution: Add products via API before checking

### Products not updating on page
Solution: 
- Check browser console for errors
- Verify MongoDB connection in server logs
- Try refreshing the page (Ctrl+Shift+R)

---

## Rollback (If Needed)

To revert to static products:
1. Restore `lib/products.ts` from backup
2. Replace `<ProductsGrid />` with static product mapping
3. Remove `.env.local` to disable MongoDB connection

---

## Next Steps

✅ Step 1: Complete MongoDB Atlas setup
✅ Step 2: Add `.env.local` with connection string
✅ Step 3: Run `npm run dev`
✅ Step 4: Test API with first product
📝 Step 5: (Optional) Build admin dashboard
📝 Step 6: (Optional) Add product images upload
📝 Step 7: (Optional) Add product search/filtering
📝 Step 8: Deploy to production

---

## Questions?

Refer to:
- `SETUP_MONGODB.md` - Detailed MongoDB setup
- `API_REFERENCE.md` - Complete API documentation
- Console logs in your terminal for debugging
