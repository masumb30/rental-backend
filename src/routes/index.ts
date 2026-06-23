import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: UserRoutes,
    },
    {
        path: "/properties",
        route: UserRoutes,
    }
    // Add more module routes here as the app grows
    // { path: "/products", route: ProductRoutes },
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
