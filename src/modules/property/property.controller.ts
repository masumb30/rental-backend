import { Request, Response } from 'express';
import { PropertyService } from './property.service';

export const PropertyController = {
  getAllProperties: async (req: Request, res: Response): Promise<void> => {
    try {
      const properties = await PropertyService.getAllProperties();

      // Respond with success
      res.status(200).json({
        success: true,
        message: 'Properties listed successfully.',
        data: properties
      });
    } catch (error: any) {
      console.error("❌ Controller error:", error);
      res.status(500).json({
        success: false,
        message: error.message || 'An internal server error occurred.'
      });
    }
  },
  addProperty: async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.headers);
      
      const token = req.headers.authorization?.split(' ')[1];
      

      if (!token) {
         res.status(401).json({ success: false, message: "Unauthorized access" });
         return;
      }

      const newProperty = await PropertyService.createProperty(req.body, token);

      // Respond with success
      res.status(201).json({
        success: true,
        message: 'Property listed successfully and pending review.',
        data: newProperty
      });
      
    } catch (error: any) {
      console.error("❌ Controller error:", error);
      res.status(500).json({
        success: false,
        message: error.message || 'An internal server error occurred.'
      });
    }
  },
  deleteProperty: async (req: Request, res: Response): Promise<void> => {
    try {
      const propertyId = req.params.id;
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        res.status(401).json({ success: false, message: "Unauthorized access" });
        return;
      }

      const deletedProperty = await PropertyService.deleteProperty(propertyId as string, token);

      // Respond with success
      res.status(200).json({
        success: true,
        message: 'Property deleted successfully.',
        data: deletedProperty
      });
      
    } catch (error: any) {
      console.error("❌ Controller error:", error);
      res.status(500).json({
        success: false,
        message: error.message || 'An internal server error occurred.'
      });
    }
  }
};