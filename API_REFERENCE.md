# API Reference - Gulabi Guiltz

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### 1. GET /api/products
**Description:** Fetch all products from database

**Method:** GET

**URL:** 
```
GET /api/products
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Mint Butterfly Clip",
      "code": "GG-001",
      "price": "₹299",
      "description": "A soft handcrafted butterfly, made to sit gently in your hair. Light, detailed, and quietly expressive.",
      "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
      "category": "Hair Accessories",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to fetch products"
}
```

---

### 2. POST /api/products
**Description:** Create a new product

**Method:** POST

**URL:**
```
POST /api/products
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Rose Hair Clip",
  "code": "GG-002",
  "price": "₹349",
  "description": "A delicate rose-themed hair clip with subtle beading details and soft colors.",
  "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
  "category": "Hair Accessories"
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Rose Hair Clip",
    "code": "GG-002",
    "price": "₹349",
    "description": "A delicate rose-themed hair clip with subtle beading details and soft colors.",
    "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    "category": "Hair Accessories",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**Error Response - Duplicate Code (409 Conflict):**
```json
{
  "success": false,
  "error": "Product with this code already exists"
}
```

**Error Response - Invalid Data (400 Bad Request):**
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

## Field Validation

| Field | Type | Min | Max | Required | Notes |
|-------|------|-----|-----|----------|-------|
| name | string | 1 | 100 | ✅ | Product name |
| code | string | 1 | 50 | ✅ | Unique, auto-uppercase |
| price | string | - | - | ✅ | Any format (₹299, $10, etc.) |
| description | string | 10 | 500 | ✅ | Clear product description |
| image | string | - | - | ✅ | Must be valid URL |
| category | string | 0 | 50 | ❌ | Optional category |

---

## Error Codes

| Status | Error | Meaning |
|--------|-------|---------|
| 200 | - | Success - Products fetched |
| 201 | - | Success - Product created |
| 400 | Validation failed | Invalid request data |
| 409 | Product code exists | Code already in use |
| 500 | Database error | Server error |

---

## Example Requests

### cURL - Get Products
```bash
curl -X GET http://localhost:3000/api/products \
  -H "Content-Type: application/json"
```

### cURL - Add Product
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

### JavaScript - Get Products
```javascript
const getProducts = async () => {
  const response = await fetch('/api/products');
  const data = await response.json();
  console.log(data.data); // Array of products
};
```

### JavaScript - Add Product
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
  if (data.success) {
    console.log('Product created:', data.data);
  } else {
    console.error('Error:', data.error);
  }
};
```

### Python - Add Product
```python
import requests

url = "http://localhost:3000/api/products"
payload = {
    "name": "Butterfly Clip",
    "code": "GG-001",
    "price": "₹299",
    "description": "A soft handcrafted butterfly clip made with love and precision.",
    "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    "category": "Hair Accessories"
}

response = requests.post(url, json=payload)
print(response.json())
```

---

## Rate Limiting
Currently no rate limiting. For production, consider adding rate limits.

## Authentication
Currently no authentication required. For production, add API key or JWT authentication.

## CORS
API is accessible from frontend (same domain).
