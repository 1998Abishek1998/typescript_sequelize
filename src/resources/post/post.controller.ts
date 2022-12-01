import { RequestHandler } from "express";
import AppError from "../../utils/appError";
import { catchAsync } from "../../utils/catchAsync";
import User from "../user/user.model";
import Post from "./post.model";

export const createPost: RequestHandler = catchAsync(async(req, res, next) =>{
    const {UserId, title, description } = req.body
    if(!req.user.id) return next(new AppError(400, 'Post can only be created by our app verified users'))
    if(UserId){
        const tempUser = await User.findByPk(UserId)
        if(!tempUser) return next(new AppError(404, 'Post can only be created by our app verified users'))
    }
    var post = await Post.create({
        title: title,
        description: description,
        UserId: UserId ? UserId : req.user.id
    })
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