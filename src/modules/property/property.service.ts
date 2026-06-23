import { Property, IProperty } from './property.model';

export const PropertyService = {
  // Async function to create and save a property to MongoDB
  createProperty: async (propertyData: Partial<IProperty>, userId: string) => {
    try {
      const newProperty = new Property({
        ...propertyData,
        userId // Attach the authenticated user ID
      });

      // Save to database using await
      const savedProperty = await newProperty.save();
      return savedProperty;
    } catch (error) {
      console.error("❌ Database save error:", error);
      throw new Error("Failed to save property to the database.");
    }
  }
};