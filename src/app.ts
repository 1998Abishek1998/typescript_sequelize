import express, { Application, json, urlencoded } from "express";
import helmet from "helmet";
import cors from 'cors'
import morgan from "morgan";
import compression from "compression";

import AppRouter from "./utils/interface/appRouter.interface";
import { errorMiddleware } from "./middleware/error.middleware";
import connection from "./dbConfig";
import AppError from "./utils/appError";


class App {
    public express: Application
    public port: number

    constructor(routers: AppRouter[], port: number){
        this.express = express()
        this.port = port
        
        this.initializeDBConnection()
        this.initializeMiddleware()
        this.initializeRouters(routers)
        this.initializeErrorHandling()
    }

    private initializeMiddleware(): void{
        this.express.use(helmet())
        this.express.use(cors())
        if(process.env.NODE_ENV === 'development') this.express.use(morgan('dev'))
        this.express.use(json())
        this.express.use(urlencoded({ extended: false }))
        this.express.use(compression())
    }

    private initializeRouters(routers: AppRouter[]): void {
        routers.forEach((route) => {
            this.express.use('/api', route.router)
        })
    }

    private initializeErrorHandling(): void{
        this.express.use(errorMiddleware)
        this.express.all('*', (req, res, next) => {
            next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
        })
    }

    private initializeDBConnection(): void{
        connection.sync().then(() => {
            console.log('Db Connected')
        }).catch((err) => {
            console.log(err,' Error -_-')
        })
    }

    public listen(): void{
        this.express.listen(this.port, () => console.log(`App listening on port: ${this.port}`))
    }
}

export default App