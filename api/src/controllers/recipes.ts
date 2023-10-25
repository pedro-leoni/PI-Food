// [ ] POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos
import Recipe from "../models/Recipe";
import Diet from "../models/Diet";
import { Request, Response } from "express";
import { RecipeAttributes } from "custom";
import { fixDbInfo, getAllInfo } from "../utils/api_and_db";
import axios from "axios";

const { API_KEY, API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6, API_KEY7,API_KEY8, API_KEY9 } = process.env;

interface saveAttributes extends RecipeAttributes {
    diet: string
}

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
        } = req.body as saveAttributes 
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

export const getRecipeById = async (req: Request, res: Response) => {
    const { id } = req.params
        try{
            const recipesDb = await fixDbInfo()
            const recipeDb = recipesDb.find((r: any) => r.id === id)
            if(recipeDb){
                res.json({data: recipeDb})
            } else {
                const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY7}`
                const recipeApi = await axios(url)
                res.json({data: recipeApi.data})
            }
    } catch(err) {
        res.status(404).json({msg: 'Receta no encontrada', err: err})
    } 
}

export const deleteRecipe = async (req: Request, res: Response) => {
    const { id } = req.params;

    const recipe = await Recipe.findByPk(id)

    await recipe!.destroy()
    
    console.log(recipe)

    res.status(200).json({ msg: `recipe id: ${id} deleted`})
}

export const getByQuery = async(req: Request, res: Response) => {
    try{
        const queryName = (req.query.name! as string).toLowerCase()
        //console.log('QUERY ->    : ', queryName)
        const allRecipes = await getAllInfo();
        if(queryName) {
            const queryFilter = await allRecipes.filter( (r: any) => r.name.toLowerCase().includes(queryName.toLowerCase()))
            if(queryFilter.length){
                res.status(200).json(queryFilter)
            } else {
                res.status(404).json({msg: 'Receta no encontrada'})
            }
        } else {
            res.status(200).json(allRecipes)
        }
    } catch(err) {
        res.status(500).json({msg: err})
    }
}
