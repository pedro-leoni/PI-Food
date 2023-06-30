// [ ] POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos
import Recipe from "../models/Recipe";
import Diet from "../models/Diet";
import { Request, Response } from "express";
import { RecipeAttributes } from "custom";

export const saveRecipe = async (req: Request, res: Response) => {
    try{
        const {
            name,
            resume,
            rate,
            healthy_level,
            instructions,
            img,
            diet
        } = req.body as any 
        const newRecipe = await Recipe.create({
            name,
            resume,
            rate,
            healthy_level,
            instructions,
            img,
            created_in_db: true
        })
        const dietInfo = await Diet.findAll({
            where: {
                name: diet
            }
        })
        // newRecipe.addDiet(dietInfo)
        res.json({msg: 'Receta creada con exito'})
    }catch(err){
        res.status(400).json({msg: err})
    }

}