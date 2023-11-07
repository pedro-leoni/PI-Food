// [ ] POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos
import axios from "axios";
import Recipe from "../models/Recipe";
import Diet from "../models/Diet";
import { Request, Response } from "express";
import { RecipeAttributes } from "custom";
import { fixDbInfo, getAllInfo } from "../utils/api_and_db";
import { recipesCache } from "../utils/api_and_db";
// TODO: servicio para gestionar api keys y su funcionamiento
const { API_KEY, API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6, API_KEY7,API_KEY8, API_KEY9 } = process.env;

interface saveAttributes extends RecipeAttributes {
    diet: string
}

export const saveRecipe = async (req: Request, res: Response) => {
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
    // const dietInfo = await Diet.findAll({
    //     where: {
    //         name: diet
    //     }
    // })
    // newRecipe.addDiet(dietInfo)
    newRecipe.save()
    recipesCache.del('recipes')
    res.json({msg: 'Receta creada con exito'})
}

export const getRecipeById = async (req: Request, res: Response) => {
    const { id } = req.params
    // QUE MIERDA ES ESTO XD

    // const recipesDb = await fixDbInfo()
    // const recipeDb = recipesDb.find((r) => r.id === id)
    // if(recipeDb){
    //     res.json({data: recipeDb})
    // } else {
    //     const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY7}`
    //     const recipeApi = await axios(url)
    //     res.json({data: recipeApi.data})
    // }
    res.status(200).json('Por favor arregla este controlador que da verguenza ajena!')
}

export const deleteRecipe = async (req: Request, res: Response) => {
    // TODO: cambiar por borrado logico
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id)
    await recipe!.destroy()
    console.log(recipe)
    res.status(200).json({ msg: `recipe id: ${id} deleted`})
}

export const getByQuery = async(req: Request, res: Response) => {
    // TODO: pensar en filtros y paginado desde cache
    const search = req.headers.search ? req.headers.search as string : undefined;
    const allRecipes = await getAllInfo(search);
    if(search) {
        const filtered = await allRecipes.filter( (r: Recipe) => r.name.match(search))
        if(filtered.length){
            res.status(200).json(filtered)
        } else {
            res.status(404).json({msg: 'Receta no encontrada'})
        }
    } else {
        res.status(200).json(allRecipes)
    }
}
