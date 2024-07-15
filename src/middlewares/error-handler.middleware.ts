import {NextFunction, Request, Response} from "express";

export function errorHandlerMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
}