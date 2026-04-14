# Quick Reference Card

## 🚀 Get Started in 5 Minutes

### 1. Setup MongoDB
```
https://www.mongodb.com/cloud/atlas
→ Create account → Create cluster → Get connection string
```

### 2. Create `.env.local`
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/gulabi-guiltz?retryWrites=true&w=majority
```

### 3. Start Server
```bash
npm run dev
```

### 4. Add Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mint Butterfly Clip",
    "code": "GG-001",
    "price": "₹299",
    "description": "A soft handcrafted butterfly clip made with love.",
    "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500",
    "category": "Hair Accessories"
  }'
```

### 5. View Website
http://localhost:3000/products

---

## 📚 Documentation Map

| Need | File |
|------|------|
| Overview | `BACKEND_IMPLEMENTATION_SUMMARY.txt` |
| Setup | `SETUP_MONGODB.md` |
| API Docs | `API_REFERENCE.md` |
| Testing | `TESTING_GUIDE.md` |
| Changes | `MIGRATION_NOTES.md` |
| Checklist | `BACKEND_CHECKLIST.md` |
| Files | `FILES_MANIFEST.md` |
| Index | `README_BACKEND_SYSTEM.md` |

---

## 🔌 API Quick Commands

### Get All Products
```bash
curl http://localhost:3000/api/products
```

### Add Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"...","code":"...","price":"...","description":"...","image":"...","category":"..."}'
```

### Check in JavaScript
```javascript
// Browser console
fetch('/api/products').then(r => r.json()).then(d => console.log(d))
```

---

## ✅ Validation Rules

```
name:        1-100 chars (required)
code:        1-50 chars, unique (required)
price:       any format (required)
description: 10-500 chars (required)
image:       valid URL (required)
category:    0-50 chars (optional)
```

---

## 🗂️ File Structure

```
Backend:
  lib/db.ts                          - MongoDB connection
  lib/models/Product.ts              - Data schema
  lib/validations/product.ts         - Input validation
  app/api/products/route.ts          - API endpoints

Frontend:
  hooks/useProducts.ts               - Data hook
  components/ProductsGrid.tsx        - Grid component
  app/products/page.tsx              - Products page

Config:
  .env.local                         - Environment (CREATE THIS)
  .env.example                       - Template

Docs:
  *.md files                         - Guides & references
```

---

## 🛠️ Common Tasks

| Task | Command |
|------|---------|
| Start dev | `npm run dev` |
| Build | `npm run build` |
| Start prod | `npm run start` |
| Lint | `npm run lint` |

---

## 🧪 Test Checklist

- [ ] MongoDB connects (see "MongoDB connected successfully")
- [ ] GET /api/products returns `{"success":true,"data":[]}`
- [ ] POST adds product (returns 201)
- [ ] Duplicate code rejected (returns 409)
- [ ] Invalid data rejected (returns 400)
- [ ] /products page shows products
- [ ] Products persist after restart
- [ ] Error handling works

---

## 📊 API Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | Success | GET products works |
| 201 | Created | POST product created |
| 400 | Bad Request | Invalid data |
| 409 | Conflict | Duplicate code |
| 500 | Server Error | Database down |

---

## 🚨 Common Issues

| Problem | Solution |
|---------|----------|
| "MONGODB_URI not defined" | Create .env.local with connection string |
| "Product code exists" | Use unique code for each product |
| Products show "Coming Soon" | Add products via API |
| No products loading | Check Network tab (GET /api/products 200?) |
| Database connection error | Check MongoDB cluster is running & IP whitelisted |

---

## 📱 Database

**Provider:** MongoDB Atlas (free tier)

**Collection:** `gulabi-guiltz`

**Table:** `products`

**Fields:**
- `_id` - MongoDB ID (auto)
- `name` - Product name
- `code` - Unique code
- `price` - Price string
- `description` - Details
- `image` - Image URL
- `category` - Optional category
- `createdAt` - Auto timestamp
- `updatedAt` - Auto timestamp

---

## 🔒 Security Checklist

**Development:**
- ✅ No auth needed
- ✅ Great for testing

**Production (Add These):**
- ⚠️ API key auth
- ⚠️ Admin auth
- ⚠️ Rate limiting
- ⚠️ HTTPS only
- ⚠️ Database user permissions
- ⚠️ Error logging
- ⚠️ Backups

---

## 🎯 Success Indicators

You're done when:
- ✅ `npm run dev` runs without errors
- ✅ GET /api/products works
- ✅ POST /api/products creates products
- ✅ /products page shows products
- ✅ Products persist in MongoDB

---

## 📞 Support

1. **Setup issues?** → Read `SETUP_MONGODB.md`
2. **API questions?** → Read `API_REFERENCE.md`
3. **Testing?** → Read `TESTING_GUIDE.md`
4. **Troubleshooting?** → Check "Common Issues" in each doc

---

## 📝 Environment Variables

**Required:**
```env
MONGODB_URI=mongodb+srv://[user]:[pass]@[cluster]/[db]?retryWrites=true&w=majority
```

**Example:**
```env
MONGODB_URI=mongodb+srv://gulabi_user:MyPassword123@gulabi-cluster.mongodb.net/gulabi-guiltz?retryWrites=true&w=majority
```

**Location:** Create `.env.local` in project root

---

## 🎁 What's New

**Code Added:**
- 7 new code files (~355 lines)
- 8 documentation files (~2,400 lines)

**Files Modified:**
- app/page.tsx (removed static imports)
- app/products/page.tsx (uses ProductsGrid)
- next.config.mjs (strict TypeScript)

**Old Files (Deprecated):**
- lib/products.ts (kept as reference)
- public/api/placeholder.ts (kept as reference)

---

## 🚀 Deployment Checklist

### Before Deploying
- [ ] Setup MongoDB Atlas
- [ ] Add .env.local
- [ ] Test locally (`npm run dev`)
- [ ] Build successfully (`npm run build`)
- [ ] Test production build (`npm run start`)

### Before Going Live
- [ ] Add API authentication
- [ ] Setup rate limiting
- [ ] Configure CORS
- [ ] Setup error logging (Sentry)
- [ ] Enable HTTPS
- [ ] Setup backups
- [ ] Security audit

### Vercel Deployment
1. Connect GitHub repo
2. Add MONGODB_URI in Environment Variables
3. Deploy!

---

## 💡 Pro Tips

✅ **Always test locally first** before deploying

✅ **Use Postman** to test API endpoints easily

✅ **Check MongoDB Atlas** to verify data is saved

✅ **Read the logs** - they tell you what's wrong

✅ **Start with one product** before adding many

✅ **Keep .env.local** in .gitignore (don't commit)

✅ **Use unique product codes** (GG-001, GG-002, etc.)

---

## 🎓 Learning Resources

- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [Zod Docs](https://zod.dev/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [REST API Best Practices](https://restfulapi.net/)

---

## 📞 Next Steps

1. Read `BACKEND_IMPLEMENTATION_SUMMARY.txt` (5 min)
2. Follow `SETUP_MONGODB.md` (15 min)
3. Run `npm run dev` (2 min)
4. Add first product (2 min)
5. View on /products (1 min)

**Total: ~25 minutes to fully functional system**

---

## ✨ You're All Set!

Your dynamic products system is ready.

**Next:** Open `BACKEND_IMPLEMENTATION_SUMMARY.txt` and start the setup!

Happy coding! 🎉
