# Testing Guide - Dynamic Products System

## Overview
This guide shows you how to test every part of your new backend system.

## Prerequisites
- MongoDB Atlas account with cluster running
- `.env.local` with MONGODB_URI
- Development server running (`npm run dev`)

---

## Test 1: Verify MongoDB Connection

### What We're Testing
MongoDB connection is working properly.

### Steps

1. **Check Server Logs**
   ```bash
   # You should see this in your terminal when server starts:
   MongoDB connected successfully
   ```

2. **If You Don't See This**
   - Check `.env.local` exists and has correct MONGODB_URI
   - Check MongoDB cluster is running (not paused)
   - Check IP address is whitelisted in MongoDB Atlas
   - Check username/password are correct in connection string

### Expected Result
✅ Server logs show "MongoDB connected successfully"

---

## Test 2: GET /api/products (Empty Database)

### What We're Testing
API returns empty array when no products exist.

### Using cURL
```bash
curl -X GET http://localhost:3000/api/products \
  -H "Content-Type: application/json"
```

### Using JavaScript (Browser Console)
```javascript
fetch('/api/products')
  .then(res => res.json())
  .then(data => console.log(data))
```

### Expected Response
```json
{
  "success": true,
  "data": []
}
```

### If You Get Error
- Check server logs for error messages
- Verify MongoDB connection is working (Test 1)
- Check firewall/network connectivity to MongoDB

---

## Test 3: POST /api/products (Valid Product)

### What We're Testing
API creates product with valid data.

### Using cURL
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

### Using Postman
1. Create new POST request
2. URL: `http://localhost:3000/api/products`
3. Body: Raw JSON (copy the JSON above)
4. Send

### Using JavaScript
```javascript
const addProduct = async () => {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: "Mint Butterfly Clip",
      code: "GG-001",
      price: "₹299",
      description: "A soft handcrafted butterfly clip made with love and precision.",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
      category: "Hair Accessories"
    })
  });
  return response.json();
};

addProduct().then(console.log);
```

### Expected Response (201 Created)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Mint Butterfly Clip",
    "code": "GG-001",
    "price": "₹299",
    "description": "A soft handcrafted butterfly clip made with love and precision.",
    "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    "category": "Hair Accessories",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Success Indicators
- Status code is 201
- Response has `"success": true`
- Product has `_id` (MongoDB ID)
- All fields are present
- `createdAt` and `updatedAt` are set

---

## Test 4: POST /api/products (Duplicate Code)

### What We're Testing
API prevents duplicate product codes.

### Using cURL
```bash
# This should fail because we created GG-001 in Test 3
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Different Product",
    "code": "GG-001",
    "price": "₹399",
    "description": "This has a duplicate code and should fail validation.",
    "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop"
  }'
```

### Expected Response (409 Conflict)
```json
{
  "success": false,
  "error": "Product with this code already exists"
}
```

### Success Indicators
- Status code is 409
- Response has `"success": false`
- Error message mentions duplicate code

---

## Test 5: POST /api/products (Missing Field)

### What We're Testing
API validates required fields.

### Using cURL (Missing description)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Invalid Product",
    "code": "GG-002",
    "price": "₹299",
    "image": "https://example.com/image.jpg"
  }'
```

### Expected Response (400 Bad Request)
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

### Success Indicators
- Status code is 400
- Response has validation error details
- Error message indicates which field failed

---

## Test 6: POST /api/products (Invalid URL)

### What We're Testing
API validates image is a proper URL.

### Using cURL
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Invalid URL Product",
    "code": "GG-003",
    "price": "₹299",
    "description": "This product has an invalid image URL.",
    "image": "not-a-url"
  }'
```

### Expected Response (400 Bad Request)
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "errors": [
      {
        "code": "invalid_url",
        "path": ["image"],
        "message": "Image must be a valid URL"
      }
    ]
  }
}
```

### Success Indicators
- Status code is 400
- Error mentions invalid URL

---

## Test 7: GET /api/products (After Adding Products)

### What We're Testing
API returns products after they're added.

### Using cURL
```bash
curl -X GET http://localhost:3000/api/products
```

### Expected Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Mint Butterfly Clip",
      "code": "GG-001",
      "price": "₹299",
      "description": "A soft handcrafted butterfly clip made with love and precision.",
      "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
      "category": "Hair Accessories",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Success Indicators
- Status code is 200
- Response has `"success": true`
- Array contains the product you created
- Product has all fields

---

## Test 8: Frontend - Products Page

### What We're Testing
Products page displays products dynamically.

### Steps
1. Go to `http://localhost:3000/products`
2. You should see your product(s) in a grid
3. Click on a product card
4. Verify all details show correctly

### What You Should See
- Loading spinner briefly while fetching
- Product card with image
- Product name, code, price
- Description
- "Enquire" button (links to WhatsApp)

### Success Indicators
- ✅ Product appears on page
- ✅ All product details are visible
- ✅ Image loads correctly
- ✅ WhatsApp button works (links to correct number/message)

---

## Test 9: Frontend - Products Hook

### What We're Testing
`useProducts` hook loads data correctly.

### Using Browser Console
```javascript
// Open your browser's developer console (F12)
// Go to any page
// Paste this:

import { useProducts } from '@/hooks/useProducts';

// This won't work in console directly, but you can test by:
// 1. Open page source and check network requests
// 2. Should see GET /api/products in Network tab
// 3. Status should be 200
```

### Alternative: Check Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Visit `/products` page
4. Look for `api/products` request
5. Status should be 200
6. Response should have products array

### Success Indicators
- ✅ Network request to `/api/products` shows status 200
- ✅ Response contains products array
- ✅ Page displays products without errors

---

## Test 10: Database Verification

### What We're Testing
Products are actually stored in MongoDB.

### Steps
1. Go to MongoDB Atlas (https://cloud.mongodb.com)
2. Click your cluster
3. Click "Collections"
4. Select "gulabi-guiltz" database
5. Click "products" collection
6. You should see your product(s) here

### What You Should See
Documents with fields:
- `_id` (MongoDB ID)
- `name`
- `code`
- `price`
- `description`
- `image`
- `category`
- `createdAt`
- `updatedAt`

### Success Indicators
- ✅ Collection exists with correct name
- ✅ Documents have correct fields
- ✅ Data matches what you sent via API

---

## Test 11: Adding Multiple Products

### What We're Testing
Can add multiple products with different codes.

### Product 2
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rose Hair Clip",
    "code": "GG-002",
    "price": "₹349",
    "description": "A delicate rose-themed hair clip with subtle beading details.",
    "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    "category": "Hair Accessories"
  }'
```

### Product 3
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Beaded Bracelet",
    "code": "GG-003",
    "price": "₹249",
    "description": "A colorful handmade beaded bracelet perfect for any occasion.",
    "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    "category": "Jewelry"
  }'
```

### Verify All Products
```bash
curl http://localhost:3000/api/products
```

### Success Indicators
- ✅ All products created successfully (201 status)
- ✅ GET returns array with 3 products
- ✅ `/products` page shows grid with 3 products

---

## Test 12: Persistence Test

### What We're Testing
Products persist after server restart.

### Steps
1. Add a product via API (if not done already)
2. Verify it shows on `/products` page
3. Stop development server (Ctrl+C)
4. Wait 5 seconds
5. Start server again (`npm run dev`)
6. Go to `/products` page again

### Expected Result
✅ Product is still there (not lost)

### Why This Matters
Proves data is saved in database, not in memory.

---

## Test 13: Error Handling

### What We're Testing
API handles errors gracefully.

### Test MongoDB Down
```bash
# Stop MongoDB (pause cluster in MongoDB Atlas)
# Try to GET products
curl http://localhost:3000/api/products

# Should get 500 error with "Failed to fetch products"
```

### Expected Response
```json
{
  "success": false,
  "error": "Failed to fetch products"
}
```

### Resume MongoDB
```bash
# Resume cluster in MongoDB Atlas
# Try again - should work
```

### Success Indicators
- ✅ Returns proper error message (not blank page)
- ✅ Status code is 500 (or appropriate error code)
- ✅ Doesn't expose sensitive error details

---

## Complete Test Checklist

Run through all tests and mark as you go:

- [ ] Test 1: MongoDB Connection
- [ ] Test 2: GET empty products
- [ ] Test 3: POST valid product
- [ ] Test 4: POST duplicate code
- [ ] Test 5: POST missing field
- [ ] Test 6: POST invalid URL
- [ ] Test 7: GET with products
- [ ] Test 8: Products page display
- [ ] Test 9: Products hook/network
- [ ] Test 10: Database verification
- [ ] Test 11: Multiple products
- [ ] Test 12: Persistence after restart
- [ ] Test 13: Error handling

---

## Troubleshooting Tests

### Test Shows Wrong Status Code
- Check server logs for error message
- Verify MongoDB connection
- Check request format (headers, body)

### Test Returns Empty Data
- Verify product was created (check previous test)
- Check MongoDB database directly
- Check no typos in API endpoint URL

### Test Hangs/Times Out
- Check MongoDB connection status
- Check network connectivity
- Check if server is still running

### Products Don't Show on /products Page
- Check Network tab shows `/api/products` request
- Check response status (should be 200)
- Check browser console for errors (F12)
- Try refreshing page (Ctrl+Shift+R hard refresh)

---

## Success Criteria

You can consider your system working when:

✅ All 13 tests pass
✅ Products persist in database
✅ API handles errors gracefully
✅ Frontend displays products correctly
✅ No console errors in browser or server

---

## Next Steps After Testing

1. Add real product images (use actual URLs)
2. Add all your products to the database
3. Review and fix any issues found during testing
4. Plan for production deployment

---

## Quick Command Reference

```bash
# Add product (replace data)
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"...","code":"...","price":"...","description":"...","image":"...","category":"..."}'

# Get all products
curl http://localhost:3000/api/products

# Pretty print response (macOS/Linux)
curl http://localhost:3000/api/products | jq

# Pretty print response (Windows - if jq installed)
curl http://localhost:3000/api/products | jq
```

---

## Still Having Issues?

1. Read error messages carefully
2. Check SETUP_MONGODB.md "Common Issues & Fixes"
3. Check MIGRATION_NOTES.md "Troubleshooting"
4. Check server console logs
5. Check browser console (F12)
6. Check MongoDB Atlas dashboard for connection issues
