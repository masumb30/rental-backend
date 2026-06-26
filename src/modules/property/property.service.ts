import mongoose from 'mongoose';
import { Property, IProperty } from './property.model';

export const PropertyService = {
  // Async function to create and save a property to MongoDB
  createProperty: async (propertyData: Partial<IProperty>, token: string) => {
    console.log("token from service: ", token)
    // get the userid from the token by fetching a session that matches the token from a 'session' collection
    const db = mongoose.connection.db;
    if (!db) {
      console.error("❌ Database connection not initialized");
      throw new Error("Database connection not initialized.");
    }
    const session = await db.collection('session').findOne({ token });
    if (!session) {
      console.error("❌ Session not found");
      throw new Error("Session not found.");
    }
    const user = await db.collection('user').findOne({ _id: session.userId });
    if (!user) {
      console.error("❌ User not found");
      throw new Error("User not found.");
    }
    const userInfo = {
      name: user.name,
      id: user._id.toString()
    };
    propertyData.ownerInfo = userInfo;


    try {
      // Directly creates and saves the document in one step
      const savedProperty = await Property.create({
        ...propertyData,
      });

      return savedProperty;
    } catch (error) {
      console.error("❌ Database save error:", error);
      throw new Error("Failed to save property to the database.");
    }
  },
  updateProperty: async (propertyId: string, updateData: Partial<IProperty>, token: string) => {
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database connection not initialized.");

    // Authenticate user via token
    const session = await db.collection('session').findOne({ token });
    if (!session) throw new Error("Session not found.");

    // Fetch the property to check ownership
    const property = await Property.findById(propertyId);
    if (!property) throw new Error("Property not found.");

    // Authorization Guard: Check if the session's userId matches the property owner's id
    if (property.ownerInfo?.id !== session.userId.toString()) {
      throw new Error("Unauthorized: You do not own this property listing.");
    }

    try {
      // Update and return the newly modified document
      const updatedProperty = await Property.findByIdAndUpdate(
        propertyId,
        { $set: updateData },
        { new: true, runValidators: true } // 'new: true' returns the updated document, 'runValidators' enforces schema checks
      );
      return updatedProperty;
    } catch (error) {
      console.error("❌ Database update error:", error);
      throw new Error("Failed to update property in the database.");
    }
  },

  // 3. Delete Property (DELETE)
  deleteProperty: async (propertyId: string, token: string) => {
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database connection not initialized.");

    // Authenticate user via token
    const session = await db.collection('session').findOne({ token });
    if (!session) throw new Error("Session not found.");

    // Fetch the property to check ownership
    const property = await Property.findById(propertyId);
    if (!property) throw new Error("Property not found.");

    // Authorization Guard: Check if the session's userId matches the property owner's id
    if (property.ownerInfo?.id !== session.userId.toString()) {
      throw new Error("Unauthorized: You do not own this property listing.");
    }

    try {
      // Remove the document from the collection
      await Property.findByIdAndDelete(propertyId);
      return { success: true, message: "Property successfully deleted." };
    } catch (error) {
      console.error("❌ Database delete error:", error);
      throw new Error("Failed to delete property from the database.");
    }
  }
};