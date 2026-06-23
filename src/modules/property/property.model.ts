import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for TypeScript type safety (Optional, but highly recommended)
export interface IProperty extends Document {
  title: string;
  description: string;
  location: string;
  type: 'Apartment' | 'House' | 'Villa';
  price: number;
  rentCycle: 'Monthly' | 'Weekly' | 'Daily';
  beds: number;
  baths: number;
  size: number;
  images: string[];
  userId: string; // To link the property to the Better Auth user
}

const PropertySchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    type: { type: String, required: true, enum: ['Apartment', 'House', 'Villa'] },
    price: { type: Number, required: true, min: 0 },
    rentCycle: { type: String, required: true, enum: ['Monthly', 'Weekly', 'Daily'] },
    beds: { type: Number, required: true, min: 0 },
    baths: { type: Number, required: true, min: 0 },
    size: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] },
    userId: { type: String, required: true }
  },
  { timestamps: true } // Automatically creates createdAt and updatedAt fields
);

export const Property = mongoose.model<IProperty>('Property', PropertySchema);