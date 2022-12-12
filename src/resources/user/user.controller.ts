import { RequestHandler } from "express";
import AppError from "../../utils/appError";
import { catchAsync } from "../../utils/catchAsync";
import User from './user.model';

export const checkUserId: RequestHandler = catchAsync(async(req, res, next) => {
    var user = await User.findByPk(req.params.id)
    if(!user) return next(new AppError(404, `User with id: ${req.params.id} cannot be found`))
    else {
        req.user = user
        next()
    } 
})

export const createUser: RequestHandler = catchAsync(async(req, res, next) =>{
    const {name, password} = req.body
    if(!name || !password) return next(new AppError(400, 'Email and passwords cannot be empty'))

    const newUser = await User.findOne({where: { name: name}})
    if(!newUser) return next(new AppError(404, 'User not registered'))

    const boolVal = User.validatePassword(newUser, req.body.password)
    
    if(!boolVal) return next(new AppError(404, 'Passwords did not matched'))
    
    return res.status(200).json({
        message: 'User logged in successfully',
        data: newUser
    })
})

export const login: RequestHandler = catchAsync(async(req, res, next) =>{
    const {name, password} = req.body
    if(!name || !password) return next(new AppError(400, 'Email and passwords cannot be empty'))

    const newUser = await User.findOne({where: { name: name}})
    if(!newUser) return next(new AppError(404, 'User not registered'))

    const boolVal = User.validatePassword(newUser, req.body.password)
    
    if(!boolVal) return next(new AppError(404, 'Passwords did not matched'))
    
    return res.status(200).json({
        message: 'User logged in successfully',
        data: newUser
    })
})

export const retreiveUserById: RequestHandler = catchAsync(async(req, res, next) =>{
    return res.status(200).json({
        message: 'User fetched successfully',
        data: req.user
    })
})

export const deleteUser: RequestHandler = catchAsync(async(req, res, next) =>{
    await User.destroy({
        where: {
           id: req.user.id
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