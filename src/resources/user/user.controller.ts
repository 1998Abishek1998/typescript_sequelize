import { RequestHandler } from "express";
import AppError from "../../utils/appError";
import { catchAsync } from "../../utils/catchAsync";
import User from './user.model';

export const checkUserId: RequestHandler = catchAsync(async(req, res, next) => {
    var user = await User.findByPk(req.params.id)
    if(!user) return next(new AppError(404, `User with id: ${req.params.id} cannot be found`))
    else next() 
})

export const createUser: RequestHandler = catchAsync(async(req, res, next) =>{
    var user = await User.create({...req.body})
    return res.status(200).json({
        message: 'User created successfully',
        data: user
    })
})

export const retreiveUserById: RequestHandler = catchAsync(async(req, res, next) =>{
    var user = await User.findByPk(req.params.id)
    return res.status(200).json({
        message: 'User fetched successfully',
        data: user
    })
})

export const deleteUser: RequestHandler = catchAsync(async(req, res, next) =>{
    await User.destroy({
        where: {
           id: req.params.id
        }
    })
    return res.status(200).json({
        message: 'User deleted Successfully'
    })
})

export const getAllUsers: RequestHandler = catchAsync(async(req, res, next) =>{
    var users = await User.findAll()
    return res.status(200).json({
        message: 'users fetched successfully',
        data: users
    })
})