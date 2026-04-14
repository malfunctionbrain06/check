# MongoDB Setup & Dynamic Products Guide

## Overview
Your Gulabi Guiltz website has been upgraded from static products (stored in code) to a fully dynamic system with MongoDB backend.

## Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (free tier available)
- Basic understanding of API requests

---

## Step 1: MongoDB Atlas Setup

### Create a Free MongoDB Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account (or sign in)
3. Create a new project called "Gulabi Guiltz"
4. Create a cluster (Select M0 - Free tier)
5. Wait for cluster to deploy (5-10 minutes)

### Get Your Connection String

1. Click "Connect" on your cluster
2. Choose "Drivers" → Node.js
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `myFirstDatabase` with `gulabi-guiltz`

Example:
```
mongodb+srv://username:password@cluster.mongodb.net/gulabi-guiltz?retryWrites=true&w=majority
```

### Create Database User (if not done)

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Username: `gulabi_user` (or your choice)
4. Password: Generate a strong password
5. Built-in Role: `Atlas Admin` (for development)

### Whitelist Your IP Address

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Select "Allow access from anywhere" (0.0.0.0/0)
4. For production: Add your server's IP address

---

## Step 2: Environment Setup

### Create `.env.local` file

1. In your project root, create `.env.local`
2. Add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gulabi-guiltz?retryWrites=true&w=majority
```

**Important**: Never commit `.env.local` to git. It's in `.gitignore` by default.

---

## Step 3: Install Dependencies

MongoDB and Mongoose are already in your package.json. Just run:

```bash
npm install
# or
pnpm install
```

---

## Step 4: Start Your Development Server

```bash
npm run dev
# or
pnpm dev
```

Visit http://localhost:3000 to see your site.

---

## API Endpoints

### GET /api/products
Fetch all products from the database.

**Request:**
```bash
curl http://localhost:3000/api/products
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Mint Butterfly Clip",
      "code": "GG-001",
      "price": "₹299",
      "description": "A soft handcrafted butterfly, made to sit gently in your hair.",
      "image": "https://example.com/image.jpg",
      "category": "Hair Accessories",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### POST /api/products
Create a new product.

**Request:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rose Hair Clip",
    "code": "GG-002",
    "price": "₹349",
    "description": "A delicate rose-themed hair clip with subtle beading details.",
    "image": "https://example.com/rose-clip.jpg",
    "category": "Hair Accessories"
  }'
```

**Response (Success - 201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Rose Hair Clip",
    "code": "GG-002",
    "price": "₹349",
    "description": "A delicate rose-themed hair clip with subtle beading details.",
    "image": "https://example.com/rose-clip.jpg",
    "category": "Hair Accessories",
    "createdAt": "2024-01-15T11:00:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "errors": [
      {
        "code": "too_small",
        "minimum": 10,
        "type": "string",
        "path": ["description"],
        "message": "Description must be at least 10 characters"
      }
    ]
  }
}
```

---

## Validation Rules

All fields are required unless marked as optional:

| Field | Type | Rules | Required |
|-------|------|-------|----------|
| name | string | 1-100 chars | ✅ Yes |
| code | string | 1-50 chars, unique | ✅ Yes |
| price | string | Any price format (₹299, $10, etc.) | ✅ Yes |
| description | string | 10-500 chars | ✅ Yes |
| image | string | Valid URL | ✅ Yes |
| category | string | Max 50 chars | ❌ No (optional) |

---

## Adding Your First Product

### Using cURL (Terminal)

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Butterfly Clip",
    "code": "GG-001",
    "price": "₹299",
    "description": "A soft handcrafted butterfly clip made with love and precision.",
    "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    "category": "Hair Accessories"
  }'
```

### Using Postman

1. Create a new POST request
2. URL: `http://localhost:3000/api/products`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "name": "Butterfly Clip",
  "code": "GG-001",
  "price": "₹299",
  "description": "A soft handcrafted butterfly clip made with love and precision.",
  "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
  "category": "Hair Accessories"
}
```
5. Click "Send"

### Using JavaScript/Fetch

```javascript
const addProduct = async () => {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: "Butterfly Clip",
      code: "GG-001",
      price: "₹299",
      description: "A soft handcrafted butterfly clip made with love and precision.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
      category: "Hair Accessories"
    }),
  });

  const data = await response.json();
  console.log(data);
};
```

---

## Viewing Products on Your Website

1. Start the development server: `npm run dev`
2. Add a product via the API (see above)
3. Go to `http://localhost:3000/products`
4. Your product will appear automatically!

---

## Common Issues & Fixes

### "MongoDB connection error"
**Problem:** `MONGODB_URI` not set or invalid

**Solution:**
1. Check `.env.local` exists and has correct URI
2. Verify MongoDB cluster is running
3. Check username/password are correct
4. Ensure IP address is whitelisted (Network Access)

### "Product with this code already exists"
**Problem:** Tried to create a product with duplicate code

**Solution:**
1. Use a unique code for each product (e.g., GG-001, GG-002, GG-003)
2. Codes are auto-converted to uppercase

### "Validation failed"
**Problem:** Missing or invalid field data

**Solution:**
1. Check all required fields are included
2. Description must be at least 10 characters
3. Image must be a valid URL (starts with http:// or https://)
4. Price can be any format (₹299, $10, Rs 500, etc.)

### "Products page shows 'Coming Soon'"
**Problem:** No products in database yet

**Solution:**
Add your first product via the API using the steps above.

---

## File Structure

```
/vercel/share/v0-project/
├── app/
│   ├── api/
│   │   └── products/
│   │       └── route.ts          ← API endpoints (GET/POST)
│   ├── products/
│   │   └── page.tsx              ← Products page
│   └── page.tsx                  ← Home page
├── lib/
│   ├── db.ts                     ← MongoDB connection
│   ├── models/
│   │   └── Product.ts            ← Product schema
│   ├── validations/
│   │   └── product.ts            ← Zod validation
│   └── products.ts               ← (Deprecated - kept for reference)
├── hooks/
│   └── useProducts.ts            ← Frontend hook for fetching
├── components/
│   ├── ProductsGrid.tsx          ← Grid component with loading
│   └── ProductCard.tsx           ← Individual product card
└── .env.local                    ← Your MongoDB URI (NOT in git)
```

---

## Next Steps

1. ✅ Complete MongoDB setup
2. ✅ Add `.env.local` with your connection string
3. ✅ Run `npm run dev`
4. ✅ Add products via API
5. 📝 (Optional) Build an admin dashboard to add products via UI
6. 📝 (Optional) Add product deletion and updates
7. 📝 (Optional) Add image upload instead of URL

---

## Need Help?

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Mongoose Docs: https://mongoosejs.com/
- Zod Validation: https://zod.dev/
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
