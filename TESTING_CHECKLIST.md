# Complete Testing Checklist

## Pre-Launch Verification

### Environment Setup

- [ ] `.env.local` file created
- [ ] `MONGODB_URI` correctly set
- [ ] `ADMIN_PASSWORD` set to secure password
- [ ] No environment variables hardcoded in code
- [ ] `node_modules` installed (`npm install`)

### Dependencies

```bash
npm list mongoose zod next react
```

Should show:
- mongoose: ^7.x or 8.x
- zod: ^3.x
- next: ^16.x
- react: ^19.x

### MongoDB Connection

1. Start dev server: `npm run dev`
2. Check console output:
   ```
   MongoDB connected successfully
   ```
3. No errors in terminal

## Test Scenario 1: Public Product View

### Test Case 1.1: View Products Page (No Products)

**Steps:**
1. Open `http://localhost:3000/products`
2. Verify page loads

**Expected:**
- "Coming Soon" message displays
- No errors in console
- Spinner briefly shows then disappears

### Test Case 1.2: Fetch Products API

**Steps:**
```bash
curl http://localhost:3000/api/products
```

**Expected:**
```json
{
  "success": true,
  "data": []
}
```

Status: **200**

## Test Scenario 2: Admin Authentication

### Test Case 2.1: Access Login Page

**Steps:**
1. Navigate to `http://localhost:3000/admin`
2. Verify page loads

**Expected:**
- Password input field visible
- Login button visible
- "Admin Panel" heading shows
- No errors

### Test Case 2.2: Wrong Password

**Steps:**
1. Enter wrong password
2. Click "Login"

**Expected:**
- Shows error: "Invalid password"
- Stays on login page
- No page redirect

### Test Case 2.3: Correct Password

**Steps:**
1. Enter correct `ADMIN_PASSWORD`
2. Click "Login"

**Expected:**
- Redirects to `/admin/dashboard`
- Dashboard loads without errors
- Can see "Add Product Form" and "Products List"

### Test Case 2.4: Login Persistence

**Steps:**
1. Login to admin
2. Refresh page (F5)

**Expected:**
- Still on dashboard (session persists)
- Cookie visible in DevTools → Application → Cookies

## Test Scenario 3: Add Product

### Test Case 3.1: Add Valid Product

**Steps:**
1. Navigate to `/admin/dashboard`
2. Fill in all fields:
   - Name: "Rose Hair Clip"
   - Code: "GG-002"
   - Price: "₹349"
   - Description: "Beautiful handcrafted rose-themed clip with soft crochet details"
   - Image: "https://via.placeholder.com/400x400?text=Rose+Clip"
   - Category: "Hair Clips"
3. Click "Add Product"

**Expected:**
- Success message: "Product added successfully!"
- Form clears
- Product appears in "Products" list below
- Name, code, price visible in table

### Test Case 3.2: Missing Required Field

**Steps:**
1. Leave "Name" field empty
2. Click "Add Product"

**Expected:**
- Error message shows
- Form data preserved
- Product NOT added

### Test Case 3.3: Invalid Image URL

**Steps:**
1. Enter invalid URL: "not-a-url"
2. Click "Add Product"

**Expected:**
- Error: "Image must be a valid URL"
- Form not submitted

### Test Case 3.4: Description Too Short

**Steps:**
1. Enter description: "Short"
2. Click "Add Product"

**Expected:**
- Error: "Description must be at least 10 characters"

### Test Case 3.5: Duplicate Product Code

**Steps:**
1. Add product with code "GG-001"
2. Try adding another with same code "GG-001"

**Expected:**
- Error: "Product with this code already exists"
- Status code: **409**
- First product still in database

## Test Scenario 4: View Added Products

### Test Case 4.1: Products Page Shows Items

**Steps:**
1. Navigate to `/products`
2. Wait for page to load

**Expected:**
- Products appear in grid
- Shows image, name, price
- WhatsApp button visible on each card
- No loading spinner

### Test Case 4.2: Product Data Correct

**Steps:**
1. Add product: "Mint Butterfly Clip" code "GG-001"
2. Go to `/products`
3. Find product in grid

**Expected:**
- Correct name, price displayed
- Image loads
- Description available on hover/click
- Code visible in admin panel

### Test Case 4.3: API Returns Added Product

**Steps:**
```bash
curl http://localhost:3000/api/products
```

**Expected:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Mint Butterfly Clip",
      "code": "GG-001",
      ...
    }
  ]
}
```

Status: **200**

## Test Scenario 5: Delete Product

### Test Case 5.1: Delete via Admin Panel

**Steps:**
1. On `/admin/dashboard`, in Products list
2. Click trash icon next to product
3. Confirm deletion

**Expected:**
- Product disappears from list
- No error message
- Products grid updated on `/products`

### Test Case 5.2: Confirm Dialog Works

**Steps:**
1. Click delete button
2. Click "Cancel" on confirmation

**Expected:**
- Product remains in list
- No deletion occurs

### Test Case 5.3: Delete Non-Existent Product

**Steps:**
1. Try to delete invalid ID via API:
```bash
curl -X DELETE http://localhost:3000/api/products/invalid_id
```

**Expected:**
- Status: **404**
- Error: "Product not found"
- No crash

## Test Scenario 6: Persistence

### Test Case 6.1: Server Restart

**Steps:**
1. Add 2-3 products
2. Stop server (Ctrl+C)
3. Start server again (`npm run dev`)
4. Check `/products`

**Expected:**
- All products still there
- Data persisted in MongoDB
- No data loss

### Test Case 6.2: Browser Restart

**Steps:**
1. Add product
2. Close browser completely
3. Reopen and go to `/products`

**Expected:**
- Product still visible
- Confirmed in database

## Test Scenario 7: WhatsApp Integration

### Test Case 7.1: WhatsApp Button

**Steps:**
1. Add product with code "GG-001"
2. Go to `/products`
3. Hover over product card
4. Click WhatsApp button

**Expected:**
- Opens WhatsApp web
- Pre-filled message includes:
  - Product name
  - Product code
  - Phone number: 9921167992
- Message format: "Hi !! I wanted to know about buying [Name] (Code: [Code])..."

## Test Scenario 8: Frontend Integration

### Test Case 8.1: Home Page Featured Section

**Steps:**
1. Add product
2. Go to home (`/`)
3. Scroll to featured products

**Expected:**
- Product appears in featured section
- Can click "Shop Collection" to see all products

### Test Case 8.2: Navigation Works

**Steps:**
1. Click "HOME", "SHOP", "ABOUT", "CONTACT" in navbar

**Expected:**
- Routes work correctly
- No 404 errors
- Pages load

## Test Scenario 9: Unauthorized Access

### Test Case 9.1: POST Without Auth

**Steps:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","code":"GG-999","price":"₹100","description":"Long enough description here","image":"https://example.com/img.jpg"}'
```

**Expected:**
- Status: **401**
- Error: "Unauthorized: Admin authentication required"
- Product NOT created

### Test Case 9.2: DELETE Without Auth

**Steps:**
```bash
curl -X DELETE http://localhost:3000/api/products/someId
```

**Expected:**
- Status: **401**
- Error: "Unauthorized"
- Product NOT deleted

### Test Case 9.3: Direct Dashboard Access

**Steps:**
1. Logout (click Logout button)
2. Try to access `/admin/dashboard` directly

**Expected:**
- Cannot access (verify by checking API calls fail with 401)
- May need to add page-level protection (optional)

## Test Scenario 10: Logout

### Test Case 10.1: Logout Function

**Steps:**
1. Login to admin
2. Click "Logout" button

**Expected:**
- Redirects to `/admin` login page
- Session cookie deleted
- Cannot access dashboard without re-login

### Test Case 10.2: Session Expiration

**Steps:**
1. Login to admin
2. Check server logs
3. Wait 24 hours (or modify code to test)

**Expected:**
- Session expires after 24 hours
- User forced to re-login

## Performance Tests

### Test Case 11.1: Load Time

**Steps:**
1. Open DevTools → Network tab
2. Load `/products`
3. Check time to first paint

**Expected:**
- First paint: < 2 seconds
- DOM ready: < 3 seconds
- No large resource blocks

### Test Case 11.2: Multiple Products (20+)

**Steps:**
1. Add 20+ products
2. Load `/products`

**Expected:**
- Page still loads quickly
- Grid renders smoothly
- No lag

## Error Handling Tests

### Test Case 12.1: Network Error

**Steps:**
1. Turn off internet
2. Try to add product
3. Try to fetch products

**Expected:**
- Shows error message
- User can retry
- No infinite loading

### Test Case 12.2: MongoDB Down

**Steps:**
1. Stop MongoDB
2. Try to fetch products

**Expected:**
- Status: **500**
- Error: "Failed to fetch products"
- Console shows connection error

## Database Tests

### Test Case 13.1: Verify MongoDB Data

**Steps:**
1. Add products via admin
2. Check MongoDB Atlas:
   - Collections → Product
   - View documents

**Expected:**
- All products appear in database
- Fields correct
- Timestamps present

### Test Case 13.2: Unique Index Works

**Steps:**
1. In MongoDB, try to insert duplicate code manually
2. MongoDB should reject it

**Expected:**
- Duplicate key error
- Index enforced

## Security Tests

### Test Case 14.1: Password Not Logged

**Steps:**
1. Login with correct password
2. Check server logs

**Expected:**
- Password NOT visible in logs
- Only success message logged

### Test Case 14.2: No Hardcoded Secrets

**Steps:**
```bash
grep -r "ADMIN_PASSWORD\|password:" app/ lib/ | grep -v ".env"
```

**Expected:**
- No results (no hardcoded passwords)

### Test Case 14.3: API Validation

**Steps:**
1. Send malformed JSON to POST endpoint
2. Send XSS payload in description

**Expected:**
- Malformed JSON: 400 error
- XSS payload: Properly escaped in database

## Final Sign-Off Checklist

- [ ] All test scenarios pass
- [ ] No console errors
- [ ] No network errors
- [ ] Products persist
- [ ] Admin panel secured
- [ ] WhatsApp works
- [ ] Pages responsive
- [ ] Performance acceptable
- [ ] Database connected
- [ ] Environment variables correct

## Deployment Readiness

- [ ] `.env.local` NOT committed
- [ ] `.env.example` updated
- [ ] No DEBUG logs in code
- [ ] Strong ADMIN_PASSWORD set
- [ ] MongoDB production URI ready
- [ ] HTTPS configured
- [ ] Error handling comprehensive
- [ ] Security headers set
- [ ] All tests passing
