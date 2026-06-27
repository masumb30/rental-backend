import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description: string;
  location: string;
  type: 'Apartment' | 'House' | 'Villa' | 'Commercial' | 'Other'; // Expanded for flexibility
  price: number;
  rentCycle: 'Monthly' | 'Weekly' | 'Daily';
  beds: number;
  baths: number;
  size: number;
  amenities: string[]; // Added
  images: string[];
  extraFeatures: string[]; // Added (Can also be String if it's a text block)
  status: 'pending' | 'approved' | 'rejected'; // Added
  
  ownerInfo?: { // Added optional embedded owner info override
    name?: string;
    id?: string;
  };
}

const PropertySchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    type: { 
      type: String, 
      required: true, 
    },
    price: { type: Number, required: true, min: 0 },
    rentCycle: { type: String, required: true, enum: ['Monthly', 'Weekly', 'Daily'] },
    beds: { type: Number, required: true, min: 0 },
    baths: { type: Number, required: true, min: 0 },
    size: { type: Number, required: true, min: 0 }, // Represents Property Size
    amenities: { type: [String], default: [] }, // Added
    images: { type: [String], default: [] },
    extraFeatures: { type: [String], default: [] }, // Added
    status: { 
      type: String, 
      required: true, 
      enum: ['pending', 'approved', 'rejected'], 
      default: 'pending' // Automatically sets to Pending on creation
    },
    ownerInfo: { // Optional: If you need data beyond just the Better Auth userId
      name: { type: String, trim: true },
      id: {type: String}, // Optional: If you want to store the Better Auth userId here as well for quick access
    },
    rejectionReason: { type: String, trim: true }, // Optional: Reason for rejection if status is Rejected
  },
  { timestamps: true } 
);

export const Property = mongoose.model<IProperty>('Property', PropertySchema);