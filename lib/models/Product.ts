import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  code: string;
  price: number;
  description: string;
  image: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
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
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
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
      default: 'general',
      maxlength: [50, 'Category cannot be more than 50 characters'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique index for product code
ProductSchema.index({ code: 1 }, { unique: true });

// Prevent model overwrite in development (Next.js fix)
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
