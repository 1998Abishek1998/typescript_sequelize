import { Router } from "express";
import { authenticated } from "../../middleware/jwt.middleware";
import AppRouter from "../../utils/interface/appRouter.interface";
import { createUser, deleteUser, getAllUsers, loginUser, retreiveUserById } from "./user.controller";

class UserRouter implements AppRouter{
    public path = '/user'
    public router = Router()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.route(`${this.path}`)
            .get(authenticated, getAllUsers)
            .post(createUser)
        
        this.router.route(`${this.path}/:id`)
            .get(authenticated, retreiveUserById)
            .delete(authenticated, deleteUser)
        
        this.router.post(`${this.path}/login`, loginUser)
    }
}

export default UserRouter