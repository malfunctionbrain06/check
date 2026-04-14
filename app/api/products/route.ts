import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import { ProductSchema } from '@/lib/validations/product';
import { validateAdminSession, getAdminSessionFromRequest } from '@/lib/auth';

// GET all products
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// CREATE product
export async function POST(request: NextRequest) {
  try {
    const sessionToken = getAdminSessionFromRequest(request);

    if (!validateAdminSession(sessionToken)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const validatedData = ProductSchema.parse(body);

    await connectDB();

    const existingProduct = await Product.findOne({
      code: validatedData.code.toUpperCase(),
    });

    if (existingProduct) {
      return NextResponse.json(
        { success: false, error: 'Product code already exists' },
        { status: 409 }
      );
    }

    const product = await Product.create(validatedData);

    return NextResponse.json(
      { success: true, data: product },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating product:', error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to create product',
      },
      { status: 400 }
    );
  }
}