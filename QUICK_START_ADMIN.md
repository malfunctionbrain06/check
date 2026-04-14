# Admin Panel - Quick Start (5 minutes)

## 1. Setup Environment (2 min)

### Create `.env.local`

```bash
cp .env.example .env.local
```

### Add Your MongoDB URI

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gulabi-guiltz?retryWrites=true&w=majority
ADMIN_PASSWORD=YourSecurePassword123
```

Get `MONGODB_URI` from:
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Clusters → Connect → Drivers → Copy connection string

## 2. Start Development Server (1 min)

```bash
npm run dev
```

You should see:
```
✓ Compiled
MongoDB connected successfully
```

## 3. Login to Admin Panel (1 min)

1. Open `http://localhost:3000/admin`
2. Enter your `ADMIN_PASSWORD`
3. Click "Login"

You're now in the Admin Dashboard!

## 4. Add Your First Product (1 min)

Fill in the form:
- **Name**: Mint Butterfly Clip
- **Code**: GG-001
- **Price**: ₹299
- **Description**: Beautiful handcrafted mint green butterfly hair clip with soft crochet details
- **Image**: https://via.placeholder.com/400x400?text=Mint+Clip
- **Category**: Hair Clips

Click "Add Product"

## 5. See It Live (instant)

- Products page: `http://localhost:3000/products`
- Home page: `http://localhost:3000` (featured section)

## Common Tasks

### Add More Products

1. Go to `/admin/dashboard`
2. Fill form
3. Click "Add Product"
4. Refresh products page

### Delete a Product

1. Go to `/admin/dashboard`
2. Click trash icon in products table
3. Confirm deletion

### Logout

Click "Logout" button in dashboard header

### Reset Password

1. Stop server
2. Edit `.env.local`
3. Change `ADMIN_PASSWORD`
4. Restart server

## API Testing

### Get All Products

```bash
curl http://localhost:3000/api/products
```

### Add Product (with auth)

Get session cookie from browser cookies after login, then:

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -b "admin_session=YOUR_COOKIE" \
  -d '{
    "name": "Rose Clip",
    "code": "GG-002",
    "price": "₹349",
    "description": "Elegant rose-themed crochet hair clip perfect for any occasion",
    "image": "https://via.placeholder.com/400x400?text=Rose+Clip",
    "category": "Hair Clips"
  }'
```

## Troubleshooting

### Can't Login

- Check `ADMIN_PASSWORD` in `.env.local`
- Restart server
- Clear browser cookies

### Products Not Showing

- Check MongoDB connection in console
- Verify `MONGODB_URI` is correct
- Check if products exist in database

### Image Not Loading

- Verify image URL is HTTPS
- Check image is publicly accessible
- Try placeholder: `https://via.placeholder.com/400x400?text=Test`

### Server Won't Start

```bash
npm install
npm run dev
```

## Files You Just Got

| File | Purpose |
|------|---------|
| `ADMIN_SETUP.md` | Complete setup guide |
| `SYSTEM_OVERVIEW.md` | Architecture & flow |
| `TESTING_CHECKLIST.md` | All test scenarios |
| `lib/auth.ts` | Admin authentication |
| `app/api/admin/login/route.ts` | Login endpoint |
| `app/api/admin/logout/route.ts` | Logout endpoint |
| `app/api/products/[id]/route.ts` | Delete endpoint |
| `app/admin/page.tsx` | Login page |
| `app/admin/dashboard/page.tsx` | Admin dashboard |
| `components/AdminLogin.tsx` | Login form |
| `components/AdminAddProduct.tsx` | Add product form |
| `components/AdminProductsList.tsx` | Products management |

## What's Included

✓ Complete MongoDB integration
✓ Secure admin authentication
✓ Product management (add/delete)
✓ Public product viewing
✓ WhatsApp integration (pre-existing)
✓ Error handling
✓ Input validation
✓ Responsive design

## Next: Full Documentation

Want more details? Read:
1. `ADMIN_SETUP.md` - Complete setup
2. `SYSTEM_OVERVIEW.md` - How it works
3. `TESTING_CHECKLIST.md` - Testing guide

## Support

### Check These First
- MongoDB connected? See console
- Password correct? Try again
- Image URL valid? Use placeholder
- Session expired? Login again

### Debug Command
```bash
# Check MongoDB connection
curl http://localhost:3000/api/products
# Should return list of products
```

---

**You're all set!** Your admin panel is ready. Go add some beautiful products! 🎨
