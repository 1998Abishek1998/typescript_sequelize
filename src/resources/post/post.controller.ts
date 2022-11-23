import { RequestHandler } from "express";
import AppError from "../../utils/appError";
import { catchAsync } from "../../utils/catchAsync";
import Post from "./post.model";

export const checkPostId: RequestHandler = catchAsync(async(req, res, next) => {
    var post = await Post.findByPk(req.params.id)
    if(!post) return next(new AppError(404, `Post with id: ${req.params.id} cannot be found`))
    else next() 
})

export const createPost: RequestHandler = catchAsync(async(req, res, next) =>{
    var post = await Post.create({...req.body})
    return res.status(200).json({
        message: 'Post created successfully',
        data: post
    })
})

export const retreivePostById: RequestHandler = catchAsync(async(req, res, next) =>{
    var post = await Post.findByPk(req.params.id)
    return res.status(200).json({
        message: 'Post fetched successfully',
        data: post
    })
})

export const deletePost: RequestHandler = catchAsync(async(req, res, next) =>{
    await Post.destroy({
        where: {
           id: req.params.id
        }
    })
    return res.status(200).json({
        message: 'Post deleted Successfully'
    })
})

export const getAllPosts: RequestHandler = catchAsync(async(req, res, next) =>{
    var posts = await Post.findAll()
    return res.status(200).json({
        message: 'Posts fetched successfully',
        data: posts
    })
})