import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { PropertyRoutes } from "../modules/property/property.route";

const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: UserRoutes,
    },
    {
        path: "/properties",
        route: PropertyRoutes,
    }
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
