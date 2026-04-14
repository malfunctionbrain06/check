# Gulabi Guiltz - Admin Panel Setup Guide

## Overview

This guide walks you through setting up and using the complete product management system with a secure admin panel.

## Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier works fine)
- Next.js 16 project already running

## Step 1: Set Environment Variables

### 1.1 Create `.env.local` file

Copy the `.env.example` file and create `.env.local`:

```bash
cp .env.example .env.local
```

### 1.2 Add MongoDB URI

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0)
3. Get your connection string
4. Update `.env.local`:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gulabi-guiltz?retryWrites=true&w=majority
```

### 1.3 Set Admin Password

Set a strong password for admin access:

```
ADMIN_PASSWORD=your_very_secure_password_here
```

## Step 2: Database Setup

### 2.1 Connect to Database

The application automatically connects to MongoDB when you start it. To verify:

1. Start the development server:

```bash
npm run dev
```

2. Check the console for:

```
MongoDB connected successfully
```

### 2.2 Database Structure

The system creates a `Product` collection with the following schema:

```typescript
{
  name: string (required, 1-100 chars)
  code: string (required, unique, 1-50 chars)
  price: string (required)
  description: string (required, 10-500 chars)
  image: string (required, valid URL)
  category: string (optional, max 50 chars)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## Step 3: Access Admin Panel

### 3.1 Navigate to Admin Login

Open your browser and go to:

```
http://localhost:3000/admin
```

### 3.2 Login

Enter your `ADMIN_PASSWORD` and click "Login"

### 3.3 Admin Dashboard

You'll see:

- **Add Product Form** - Add new products
- **Products List** - View and manage all products
- **Delete Button** - Remove products from inventory

## Step 4: Add Your First Product

### 4.1 Fill in the Form

1. **Product Name**: e.g., "Mint Butterfly Clip"
2. **Product Code**: e.g., "GG-001" (unique identifier)
3. **Price**: e.g., "₹299"
4. **Description**: 10-500 characters describing the product
5. **Image URL**: Valid HTTPS image URL
6. **Category**: Optional (e.g., "Hair Clips")

### 4.2 Submit

Click "Add Product" - you'll see:

```json
{
  "success": true,
  "message": "Product added successfully!"
}
```

### 4.3 Verify on Frontend

Products appear instantly on:
- http://localhost:3000/products
- http://localhost:3000 (featured section)

## API Endpoints

### Public Endpoints

#### GET /api/products

Fetch all products

```bash
curl http://localhost:3000/api/products
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "_id": "65f7a1b2c3d4e5f6g7h8i9j0",
      "name": "Mint Butterfly Clip",
      "code": "GG-001",
      "price": "₹299",
      "description": "Beautiful handcrafted butterfly clip...",
      "image": "https://example.com/image.jpg",
      "category": "Hair Clips",
      "createdAt": "2024-03-20T10:30:00Z",
      "updatedAt": "2024-03-20T10:30:00Z"
    }
  ]
}
```

### Admin Protected Endpoints

All admin endpoints require authentication cookie set during login.

#### POST /api/products

Create a new product (admin only)

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -b "admin_session=your_token_here" \
  -d '{
    "name": "Rose Hair Clip",
    "code": "GG-002",
    "price": "₹349",
    "description": "Elegant rose-themed crochet hair clip",
    "image": "https://example.com/rose.jpg",
    "category": "Hair Clips"
  }'
```

Responses:

**Success (201)**
```json
{
  "success": true,
  "data": {
    "_id": "65f7a1b2c3d4e5f6g7h8i9j0",
    "name": "Rose Hair Clip",
    ...
  }
}
```

**Validation Error (400)**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [...]
}
```

**Duplicate Code (409)**
```json
{
  "success": false,
  "error": "Product with this code already exists"
}
```

**Unauthorized (401)**
```json
{
  "success": false,
  "error": "Unauthorized: Admin authentication required"
}
```

#### DELETE /api/products/[id]

Delete a product (admin only)

```bash
curl -X DELETE http://localhost:3000/api/products/65f7a1b2c3d4e5f6g7h8i9j0 \
  -b "admin_session=your_token_here"
```

Responses:

**Success (200)**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {...}
}
```

**Not Found (404)**
```json
{
  "success": false,
  "error": "Product not found"
}
```

## Testing Checklist

- [ ] MongoDB connection works
- [ ] Can access /admin login page
- [ ] Can login with correct password
- [ ] Cannot login with wrong password
- [ ] Can add product with all required fields
- [ ] Duplicate codes are rejected
- [ ] Products appear on /products page
- [ ] Products persist after server restart
- [ ] Can delete products from admin panel
- [ ] WhatsApp button works with product data
- [ ] Cannot access POST/DELETE without authentication

## Troubleshooting

### MongoDB Connection Error

**Error**: `MONGODB_URI is not defined`

**Solution**: Check `.env.local` has `MONGODB_URI`

### Admin Login Not Working

**Error**: Invalid password

**Solution**: Verify `ADMIN_PASSWORD` in `.env.local`

### Products Not Showing

**Error**: "Failed to fetch products"

**Solution**:
1. Check MongoDB connection
2. Verify no API errors in console
3. Check if products exist in database

### Image Not Loading

**Error**: Product added but image shows broken

**Solution**: Ensure image URL is:
- Valid HTTPS URL
- Publicly accessible
- Correct image format (JPG, PNG, etc.)

## Security Notes

- Admin password is stored in environment variables (never hardcoded)
- Session tokens are HTTP-only cookies
- Admin routes check authentication before allowing modifications
- All inputs are validated with Zod
- Public endpoints are read-only

## Production Deployment

Before deploying to production:

1. Set strong `ADMIN_PASSWORD`
2. Use your MongoDB Atlas production URI
3. Set `NODE_ENV=production`
4. Enable HTTPS
5. Consider session storage upgrade (Redis for scalability)

## Next Steps

- Add more products via admin panel
- Integrate payment system if needed
- Set up email notifications
- Add product search/filtering
- Implement inventory tracking
