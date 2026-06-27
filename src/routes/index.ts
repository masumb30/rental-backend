import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { PropertyRoutes } from "../modules/property/property.route";
import { bookingRoutes } from "../modules/booking/booking.route";

const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: UserRoutes,
    },
    {
        path: "/properties",
        route: PropertyRoutes,
    },
    {
        path:"/booking",
        route:bookingRoutes
    }
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
