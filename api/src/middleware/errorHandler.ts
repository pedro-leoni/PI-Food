import { NextFunction, Request, Response } from "express";
import { AxiosError } from "axios";
import { ValidationError } from "sequelize";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
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
        if(err instanceof ValidationError){
            showFullError = false
            let statusErr = 500
            console.log(err)
            // TODO seguir agregando status http segun corresponda
            if (err.errors[0].type?.toLowerCase() === 'notnull violation'){
                statusErr = 400
            }
            return res.status(statusErr).json(err.message)
        }
        if (showFullError) console.log(err)
        return res.status(500).json(err);
    } catch (error) {
        return res.status(500).json();
    }
}

export default errorHandler