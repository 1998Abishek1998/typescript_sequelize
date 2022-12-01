import { Router } from "express";
import { adminAuthenticate, authenticated } from "../../middleware/jwt.middleware";
import AppRouter from "../../utils/interface/appRouter.interface";
import { beFriends, checkUserId, createUser, deleteUser, getAllUsers, loginUser, retreiveUserById } from "./user.controller";

class UserRouter implements AppRouter{
    public path = '/user'
    public router = Router()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.route(`${this.path}`)
            .get(adminAuthenticate, getAllUsers)
            .post(createUser)
        
        this.router.route(`${this.path}/:id`)
            .get(authenticated, retreiveUserById)
            .delete(authenticated, deleteUser)
        
        this.router.put(`${this.path}/addfriend/:id`, authenticated,checkUserId, beFriends)
        
        this.router.post(`${this.path}/login`, loginUser)
    }
}

export default UserRouter