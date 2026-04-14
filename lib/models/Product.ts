import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  code: string;
  price: string;
  description: string;
  image: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'Please provide a product code'],
      unique: true,
      maxlength: [50, 'Code cannot be more than 50 characters'],
      trim: true,
      uppercase: true,
    },
    price: {
      type: String,
      required: [true, 'Please provide a price'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    category: {
      type: String,
      maxlength: [50, 'Category cannot be more than 50 characters'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in development
export const Product =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
