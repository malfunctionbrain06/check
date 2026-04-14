import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Product } from '@/lib/models/Product';
import { ProductSchema } from '@/lib/validations/product';
import { validateAdminSession, getAdminSessionFromRequest } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const sessionToken = getAdminSessionFromRequest(request);
    if (!validateAdminSession(sessionToken)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized: Admin authentication required',
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate request body
    const validatedData = ProductSchema.parse(body);

    await connectDB();

    // Check if product with same code already exists
    const existingProduct = await Product.findOne({ code: validatedData.code.toUpperCase() });

    if (existingProduct) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product with this code already exists',
        },
        { status: 409 }
      );
    }

    // Create new product
    const product = await Product.create(validatedData);

    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);

    // Handle validation errors
    if (error instanceof Error && error.message.includes('ValidationError')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid product data',
          details: error.message,
        },
        { status: 400 }
      );
    }

    // Handle Zod validation errors
    if (error && typeof error === 'object' && 'errors' in error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create product',
      },
      { status: 500 }
    );
  }
}
