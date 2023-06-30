import Diet from "../models/Diet";
import axios from "axios";
import { Request, Response } from "express";
const { API_KEY, API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6, API_KEY7 } = process.env;



export const apiDietTypes = async (req: Request, res: Response) =>{
    try{
        const allDiets = await Diet.findAll();
        if(allDiets.length){
            res.status(200).json({msg: 'Los datos ya han sido ingresados', allDiets})
        } else {
            const apiGet = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=&number=5222&addRecipeInformation=true&apiKey=${API_KEY7}`)
            const apiDiets = await apiGet.data.results.map((r: any) => r.diets )
            const diets: any = []
            apiDiets.forEach((d: any) =>  {
                d.forEach( (e: any) => {
                    diets.push(e)
                })
            })
            diets.forEach( (d: any) => {
                Diet.findOrCreate({
                    where: {
                        name: d
                    }
                });
            })
            const allDiets = await Diet.findAll();
            res.status(200).json({msg: 'Datos ingresados correctamente', allDiets})
        }
    } catch(err) {
        res.status(404).json({msg: `dietTypes esta entrando al error, Seguro caduco la apiKey`, error: err})
    }
}