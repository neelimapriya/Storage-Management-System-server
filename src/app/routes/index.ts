import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { AuthRoute } from "../modules/auth/auth.route";


const router =Router()

const moduleRoutes=[
    {
        path:'/auth',
        route:AuthRoute
    },
    {
        path:'/user',
        route:UserRoute
    }
]

moduleRoutes.forEach((route)=>router.use(route.path, route.route))

export default router;