import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { PropertyController } from "./property.controller";


const router = Router();

router.get("/", PropertyController.getAllProperties);
router.get("/foradmin", PropertyController.getAllPropertiesForAdmin);
router.delete("/:id", PropertyController.deleteProperty);

router.post(
    "/",
    PropertyController.addProperty
);
router.patch("/:id/approve", PropertyController.approveProperty);
router.patch("/:id/reject", PropertyController.rejectProperty);


export const PropertyRoutes = router;