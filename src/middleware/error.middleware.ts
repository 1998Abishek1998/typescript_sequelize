import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

function handleSequelizeValidationErrorDB(error: any) {
    const returnPayload = {
        name: 'ValidationError',
        errorData: error.errors.map((item: any)=> {
            return Object.assign({
                path: item.path,
                message: item.message
            })
        })
    }
    return new AppError(400, JSON.stringify(returnPayload))
}

function handleSequelizeUniqueConstraintErrorDB(error: any) {
    const errorData = Object.assign({
        name: 'UniqueFieldError',
        errorData: error.errors[0].message
    })
    return new AppError(400, JSON.stringify(errorData))
}


const sendDevError = (err: AppError, req: Request, res: Response) => {
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
          status: err.status,
          error: err,
          message: err.message,
          stack: err.stack
        });
      }
    
    //   // B) RENDERED WEBSITE
    // console.error('ERROR 💥', err);
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message
    });
}

const sendProdError = (err: AppError, req: Request, res: Response) => {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
}

export const errorMiddleware = (
    error: AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'Something went wrong'

    let err = error

    if(err.name === "SequelizeValidationError") err = handleSequelizeValidationErrorDB(err)
    if(err.name === "SequelizeUniqueConstraintError") err = handleSequelizeUniqueConstraintErrorDB(err)

    if(process.env.NODE_ENV === 'development') sendDevError(err, req, res)
    if(process.env.NODE_ENV === 'production') sendProdError(err, req, res)
    // res.status(statusCode).send({
    //     status,
    //     message
    // })
}