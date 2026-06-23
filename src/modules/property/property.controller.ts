import { Request, Response } from 'express';
import { PropertyService } from './property.service';

export const PropertyController = {
  addProperty: async (req: Request, res: Response): Promise<void> => {
    try {
      // Assuming your Better Auth authentication middleware decodes the token 
      // and attaches the user info to req.user
      const userId = (req as any).user?.id || 'mocked_user_id_for_testing';

      if (!userId) {
         res.status(401).json({ success: false, message: "Unauthorized access" });
         return;
      }

      // Pass form data and userId to service layer using await
      const newProperty = await PropertyService.createProperty(req.body, userId);

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