import { Request, Response } from 'express';

export const bookingController = {
  createBooking: async (req: Request, res: Response): Promise<any> => {
    try {
        console.log('booking record: ', req.body)
      
        res.status(200).json({ data: "Booking created successfully" });
    } catch (error: any) {
      console.error("Error in getProperties controller:", error);
      res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
  },

}