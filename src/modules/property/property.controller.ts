import { Request, Response } from 'express';
import { PropertyService } from './property.service';

export const PropertyController = {
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
  }
};