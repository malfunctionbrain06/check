# Gulabi Guiltz - Complete System Overview

## Project Architecture

```
gulabi-guiltz/
├── app/
│   ├── api/
│   │   ├── products/
│   │   │   ├── route.ts          # GET (public), POST (admin)
│   │   │   └── [id]/route.ts     # DELETE (admin)
│   │   └── admin/
│   │       ├── login/route.ts    # Login endpoint
│   │       └── logout/route.ts   # Logout endpoint
│   ├── admin/
│   │   ├── page.tsx              # Login page
│   │   └── dashboard/page.tsx    # Admin dashboard
│   ├── products/page.tsx         # Products listing page
│   ├── page.tsx                  # Home page
│   └── layout.tsx                # Root layout
├── lib/
│   ├── db.ts                     # MongoDB connection
│   ├── auth.ts                   # Authentication utilities
│   ├── models/
│   │   └── Product.ts            # Product schema
│   └── validations/
│       └── product.ts            # Zod validation
├── components/
│   ├── AdminLogin.tsx            # Login form
│   ├── AdminAddProduct.tsx       # Add product form
│   ├── AdminProductsList.tsx     # Products management
│   ├── ProductsGrid.tsx          # Frontend products grid
│   ├── ProductCard.tsx           # Individual product card
│   └── ...other components
├── hooks/
│   └── useProducts.ts            # Products fetching hook
├── .env.example                  # Environment template
└── ADMIN_SETUP.md                # This guide
```

## Database Schema

### MongoDB - Product Collection

```typescript
{
  _id: ObjectId,
  name: string (1-100 chars),
  code: string (1-50 chars, unique),
  price: string,
  description: string (10-500 chars),
  image: string (valid URL),
  category: string (optional, 0-50 chars),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**:
- `_id` (primary)
- `code` (unique)

## API Flow

### 1. Public Product Retrieval

```
User Browser
    │
    ├─→ GET /api/products
    │
    └─→ MongoDB: fetch all products
        │
        └─→ Return JSON response
```

### 2. Admin Authentication & Product Creation

```
Admin
  │
  ├─→ POST /api/admin/login with password
  │    │
  │    ├─→ Verify password
  │    ├─→ Create session token
  │    ├─→ Set HTTP-only cookie
  │    └─→ Redirect to dashboard
  │
  └─→ POST /api/products with session cookie
       │
       ├─→ Validate auth token
       ├─→ Validate product data (Zod)
       ├─→ Check duplicate code
       ├─→ Insert to MongoDB
       └─→ Return created product
```

### 3. Product Deletion

```
Admin
  │
  └─→ DELETE /api/products/[id] with session cookie
       │
       ├─→ Validate auth token
       ├─→ Find product by ID
       ├─→ Delete from MongoDB
       └─→ Return success/error
```

## Authentication System

### Session Management

- **Token Generation**: Random string (32 chars)
- **Storage**: In-memory Map (can upgrade to Redis)
- **Expiration**: 24 hours
- **Cookie**: `admin_session` (HTTP-only, secure, same-site)

### Security Features

- Passwords never stored (compared directly from env)
- Session tokens are random
- HTTP-only cookies prevent XSS
- Secure flag for HTTPS in production
- SameSite policy prevents CSRF

### Login Flow

```
1. User enters password
2. POST /api/admin/login
3. Compare with ADMIN_PASSWORD env
4. If match:
   - Generate token
   - Store in memory
   - Set cookie
   - Redirect to /admin/dashboard
5. If fail:
   - Return 401 error
   - Show error message
```

## Component Structure

### Frontend Components

#### AdminLogin.tsx
- Password input
- Form submission
- Error handling
- Redirect on success

#### AdminAddProduct.tsx
- Product form fields:
  - name, code, price
  - description, image, category
- Real-time validation
- Success/error messages
- Auto-refresh products list

#### AdminProductsList.tsx
- Fetch products via API
- Display in table format
- Delete button per product
- Confirmation dialog
- Image previews
- Real-time updates

#### ProductsGrid.tsx
- Displays products on frontend
- Uses `useProducts` hook
- Loading and error states
- Empty state messaging
- Product card grid

#### ProductCard.tsx
- Individual product display
- Image, name, price
- Description
- WhatsApp button (unchanged)

### Backend Utilities

#### lib/db.ts
- MongoDB connection with caching
- Prevents multiple connections
- Pool size configuration
- Error handling

#### lib/auth.ts
- Session creation
- Token validation
- Password verification
- Session cleanup

#### lib/models/Product.ts
- Mongoose schema definition
- Validation at database level
- Timestamps auto-generated
- Model export (prevents recompilation)

#### lib/validations/product.ts
- Zod schema for input validation
- Field constraints
- Error messages
- Type inference

### Hooks

#### useProducts.ts
- Fetch products from API
- Handle loading/error states
- Provide refetch function
- Map MongoDB IDs

## Data Flow Examples

### Adding a Product

```
User fills form → AdminAddProduct.tsx
    │
    └─→ handleSubmit()
         │
         └─→ POST /api/products
              │
              ├─→ Validate session (auth.ts)
              ├─→ Parse request body
              ├─→ Validate with Zod (validations/product.ts)
              ├─→ Connect MongoDB (db.ts)
              ├─→ Check duplicate code (Product.ts)
              ├─→ Insert product
              │
              └─→ Return 201 + product data
                   │
                   └─→ Show success message
                       │
                       └─→ Refetch products
                           │
                           └─→ AdminProductsList updates
```

### Viewing Products (Public)

```
User visits /products
    │
    └─→ ProductsGrid component mounts
         │
         └─→ useProducts hook initializes
              │
              ├─→ fetch('/api/products')
              │
              ├─→ GET /api/products
              │    │
              │    └─→ Connect MongoDB
              │         │
              │         └─→ Find all products
              │              │
              │              └─→ Sort by createdAt
              │
              ├─→ Map response data
              │
              └─→ Render ProductCard for each
                   │
                   └─→ Display with image, price, WhatsApp button
```

## Error Handling

### API Error Codes

| Status | Meaning | Cause |
|--------|---------|-------|
| 200 | Success | GET products |
| 201 | Created | Product added |
| 400 | Bad Request | Invalid data |
| 401 | Unauthorized | No/invalid session |
| 404 | Not Found | Product doesn't exist |
| 409 | Conflict | Duplicate product code |
| 500 | Server Error | Database/server error |

### Frontend Error States

- **Network Error**: "Network error. Please try again."
- **Invalid Password**: "Invalid password"
- **Validation Error**: Field-specific messages from Zod
- **Duplicate Code**: "Product with this code already exists"
- **Server Error**: Generic "Failed to [action]"

## Validation Rules

### Product Code
- Required
- 1-50 characters
- Unique in database
- Converted to uppercase

### Product Name
- Required
- 1-100 characters
- Trimmed whitespace

### Description
- Required
- 10-500 characters

### Image
- Required
- Must be valid URL
- Must be HTTPS in production

### Price
- Required
- Any string format (₹299, $10.99, etc.)

### Category
- Optional
- Max 50 characters

## Performance Considerations

### Database
- Connection pooling (5-10 connections)
- Indexes on `code` for fast lookups
- Sorted queries by `createdAt`

### Frontend
- Client-side form validation (instant feedback)
- Optimistic UI updates
- Error boundaries
- Lazy image loading

### Caching
- MongoDB connection caching
- No API response caching (always fresh)
- Browser cache headers if needed

## Security Checklist

- [ ] ADMIN_PASSWORD is strong
- [ ] MONGODB_URI is correct
- [ ] Environment variables in .env.local (not committed)
- [ ] No hardcoded secrets
- [ ] HTTPS enabled in production
- [ ] Session expiration working
- [ ] Input validation on all fields
- [ ] SQL injection impossible (Mongoose)
- [ ] XSS protection (React escapes by default)
- [ ] CSRF protection (SameSite cookies)

## Monitoring & Debugging

### Enable Debug Logging

Set environment variable:
```
DEBUG=gulabi-guiltz:*
```

### Check MongoDB Connection

```javascript
// In browser console
fetch('/api/products')
  .then(r => r.json())
  .then(console.log)
```

### Verify Admin Session

```javascript
// Check if cookie exists
document.cookie // should show admin_session
```

### View Product Data

MongoDB Atlas → Collections → Products → View documents

## Future Enhancements

- [ ] Product image upload to S3
- [ ] Redis session storage for scalability
- [ ] Product search/filtering
- [ ] Order management system
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Multi-admin support
- [ ] Product variants (colors, sizes)
- [ ] Inventory tracking
- [ ] Payment integration
