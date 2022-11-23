class AppError extends Error {
    public statusCode: number
    public message: string
    public status: string
    public isOperational: boolean

    constructor(statusCode: number, message: string){
        super(message)

        this.statusCode = statusCode || 500
        this.status = `${statusCode}`.startsWith('4') ? 'Failed' : 'Error'
        this.message = message
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError