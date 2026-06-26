import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { PropertyController } from "./property.controller";


const router = Router();

router.get("/", PropertyController.getAllProperties);
router.delete("/:id", PropertyController.deleteProperty);

router.post(
    "/",
    PropertyController.addProperty
);



export const PropertyRoutes = router;