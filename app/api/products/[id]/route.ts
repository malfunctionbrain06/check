import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Product } from '@/lib/models/Product';
import { validateAdminSession, getAdminSessionFromRequest } from '@/lib/auth';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params;

    // Validate ID format
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid product ID',
        },
        { status: 400 }
      );
    }

    await connectDB();

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Product deleted successfully',
        data: product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete product',
      },
      { status: 500 }
    );
  }
}
