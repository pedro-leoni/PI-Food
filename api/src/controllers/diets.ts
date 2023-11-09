import {Diet} from "../models/Diet";
import axios from "axios";
import { Request, Response } from "express";
const { API_KEY, API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6, API_KEY7 } = process.env;

interface ApiResponse {
    results: {
        diets: string[];
    }[];
}

export const apiDietTypes = async (req: Request, res: Response) =>{
    const allDiets = await Diet.findAll();
    if(allDiets.length){
        res.status(200).json({msg: 'Los datos ya han sido ingresados', allDiets})
    } else {
        const response = await axios.get<ApiResponse>(`https://api.spoonacular.com/recipes/complexSearch?query=&number=5222&addRecipeInformation=true&apiKey=${API_KEY7}`)
        const apiDiets = response.data.results.map((r) => r.diets )
        const diets: string[] = []
        apiDiets.forEach((d) =>  {
            d.forEach( (e) => {
                diets.push(e)
            })
        })

        for (const d of diets) {
            await Diet.findOrCreate({
                where: {
                    name: d
                }
            })
        }

        const allDiets = await Diet.findAll();
        res.status(200).json({msg: 'Datos ingresados correctamente', allDiets})
    }
}