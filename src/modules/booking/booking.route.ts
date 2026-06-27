import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { bookingController } from "./booking.controller";


const router = Router();

router.post("/createbooking", bookingController.createBooking);



export const bookingRoutes = router;