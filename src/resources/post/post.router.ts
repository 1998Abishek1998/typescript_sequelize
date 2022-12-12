import { Router } from "express";
import { adminAuthenticate, authenticated } from "../../middleware/jwt.middleware";
import AppRouter from "../../utils/interface/appRouter.interface";
import { createPost, deletePost, getAllPosts, retreivePostById } from "./post.controller";

class PostRouter implements AppRouter{
    public path = '/post'
    public router = Router()

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.route(`${this.path}`)
            .get(adminAuthenticate, getAllPosts)
            .post(authenticated, createPost)
        
        this.router.route(`${this.path}/:id`)
            .get(authenticated, retreivePostById)
            .delete(authenticated, deletePost)    
    }
}

export default PostRouter