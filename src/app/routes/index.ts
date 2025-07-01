import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { AuthRoute } from "../modules/auth/auth.route";
import { FolderRoute } from "../modules/folder/folder.route";


const router =Router()

const moduleRoutes=[
    {
        path:'/auth',
        route:AuthRoute
    },
    {
        path:'/user',
        route:UserRoute
    },
    {
        path:'/folder',
        route:FolderRoute
    }
]

moduleRoutes.forEach((route)=>router.use(route.path, route.route))

export default router;