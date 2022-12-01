import { Router } from "express";
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
            .get(getAllPosts)
            .post(createPost)
        
        this.router.route(`${this.path}/:id`)
            .get(retreivePostById)
            .delete(deletePost)    
    }
}

export default PostRouter