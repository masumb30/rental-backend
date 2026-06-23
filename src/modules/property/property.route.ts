import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { PropertyController } from "./property.controller";


const router = Router();

router.post(
    "/",
    PropertyController.addProperty
);


export const PropertyRoutes = router;