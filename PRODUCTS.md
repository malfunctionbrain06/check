# Product Management Guide

## Adding New Products

The product system is designed to be simple and scalable. All products are managed through the `lib/products.ts` file.

### Product Schema

```typescript
interface Product {
  id: string;              // Unique identifier (e.g., 'gg-002')
  name: string;           // Product name
  code: string;           // Product code (e.g., 'GG-002')
  price: string;          // Price in rupees (e.g., '₹299')
  description: string;    // Short description
  image: string;          // Image URL
  category?: string;      // Optional category
}
```

### How to Add a Product

1. Open `lib/products.ts`
2. Add your product to the `sampleProducts` array:

```typescript
{
  id: 'gg-002',
  name: 'Rose Beaded Earrings',
  code: 'GG-002',
  price: '₹399',
  description: 'Delicate rose-inspired beaded earrings with handcrafted details.',
  image: 'https://your-image-url.com/rose-earrings.jpg',
  category: 'Earrings',
},
```

3. The product will automatically appear on the Products page

### Image Requirements

- Recommended size: 500x500px minimum
- Format: JPG, PNG, or WebP
- Aspect ratio: Square (1:1)
- Must be hosted on a CDN or image service

### WhatsApp Integration

When a user clicks "Enquire" on a product, they're taken to WhatsApp with a prefilled message:

```
Hi !! I wanted to know about buying [Product Name] (Code: [Product Code]). My name is ____ and my contact number is ____.
```

The phone number (9921167992) is configured in `ProductCard.tsx`.

### Displaying Products

Products can be displayed using the `ProductCard` component:

```tsx
import { ProductCard } from '@/components/ProductCard';
import { getProducts } from '@/lib/products';

const products = getProducts();

products.map(product => (
  <ProductCard
    key={product.id}
    id={product.id}
    name={product.name}
    code={product.code}
    price={product.price}
    description={product.description}
    image={product.image}
  />
))
```

### Future CMS Integration

This structure is ready for CMS integration. Replace `getProducts()` with an API call:

```typescript
export async function getProducts(): Promise<Product[]> {
  const response = await fetch('https://your-cms.com/products');
  return response.json();
}
```

### Product Display Locations

1. **Featured Product Section** - Home page (first product)
2. **Products Page** - Grid of all products
3. **Individual Product Pages** - Can be added via dynamic routes

---

**Last Updated:** 2025
