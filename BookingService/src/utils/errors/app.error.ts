export interface AppError extends Error{
    statusCode: number,
}

export class InternalSeverError implements AppError{
    statusCode: number;
    message: string;
    name: string;
    constructor(message: string){
        this.name = "Internal Server Errror"
        this.message=message;
        this.statusCode = 500;
    }
}
export class BadRequestError implements AppError{
    statusCode: number;
    message: string;
    name: string;
    constructor(message: string){
        this.name = "Bad Request Error"
        this.message=message;
        this.statusCode = 400;
    }
}
export class NotFound implements AppError{
    statusCode: number;
    message: string;
    name: string;
    constructor(message: string){
        this.name = "Not Found"
        this.message=message;
        this.statusCode = 404;
    }
}