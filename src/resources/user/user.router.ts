import { Router } from "express";
import AppRouter from "../../utils/interface/appRouter.interface";
import { checkUserId, createUser, deleteUser, getAllUsers, passwordValidation, retreiveUserById } from "./user.controller";

class UserRouter implements AppRouter{
    public path = '/user'
    public router = Router()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.route(`${this.path}`)
            .get(getAllUsers)
            .post(createUser)
        
        this.router.route(`${this.path}/:id`)
            .get(checkUserId, retreiveUserById)
            .delete(checkUserId, deleteUser)
            .post(checkUserId,passwordValidation)    
    }
}

export default UserRouter