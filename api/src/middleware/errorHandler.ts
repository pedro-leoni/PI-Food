import { NextFunction, Request, Response } from "express";
import { AxiosError } from "axios";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) =>{
    console.log('me ejecuto')
    console.log(err)
    try {
        let showFullError = true;
        if (err instanceof AxiosError) {
            delete err.config;
            if (err.response)
            {
                const response = err.response;
                if (response.data){
                    const data = response.data;
                    if (data.ModelState || data.Message) {
                        showFullError = false;
                        return res.status(500).json(data);
                    }
                }
                else if (response.status) {
                    showFullError = false;
                    return res.status(response.status).json();
                }
            }
            else if (err.status) {
                showFullError = false;
                return res.status(err.status).json(err.message);
            }
        }
        if (showFullError) console.log(err)
        return res.status(500).json(err);
    } catch (error) {
        return res.status(500).json();
    }
}

export default errorHandler