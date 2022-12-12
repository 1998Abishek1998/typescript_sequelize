import { RequestHandler } from "express";
import { literal } from "sequelize";
import AppError from "../../utils/appError";
import { catchAsync } from "../../utils/catchAsync";
import { createToken } from "../../utils/token";
import Post from "../post/post.model";
import User, { FriendList } from './user.model';

export const checkUserId: RequestHandler = catchAsync(async(req, res, next) => {
    const user = await User.findByPk(req.params.id)
    if(!user) return next(new AppError(404, 'User not found'))
    else next()
})

export const createUser: RequestHandler = catchAsync(async(req, res, next) =>{
    const { name, email, password, role, age} = req.body
    if(!email || !password || !age || !name) return next(new AppError(400, 'Please provide all the values: email, password, name and age'))
    var user = await User.create({
        name: name,
        email:email,
        password: password,
        age: age,
        role: role
    })
    const token = createToken(user)
    return res.status(200).json({
        message: 'User created successfully',
        data: user,
        token
    })
})

export const loginUser: RequestHandler = catchAsync(async(req, res, next) =>{
    const { name, password} = req.body
    if(!name || !password) return next(new AppError(400, 'Please provide both Email and Password'))
    var user = await User.findOne({
        where: {
            name: name
        },
    })

    if(!user) return next(new AppError(404, 'Please provide correct credentials'))
    
    const boolVal = User.validatePassword(user, password)
    if(!boolVal) return next(new AppError(404, 'Passwords did not matched'))
    
    const token = createToken(user)
    return res.status(200).json({
        message: 'User logged in successfully',
        data: user,
        token
    })
})

export const beFriends: RequestHandler = catchAsync( async(req, res, next) => {
    const toUser = await User.findByPk(req.params.id)
    if(toUser){
        toUser.update(
            { friends: literal(req.user.id)},
            { where: { id: req.params.id}},
            )
        User.update(
            { friends: literal(req.params.id)},
            { where: { id: req.user.id}}
            )
            return res.status(200).json({
                message: 'User added in successfully',
                toUser,
            })
    }
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