import  Recipe  from "../models/Recipe";
import { Request, Response } from "express";

export const deleteRecipe = async (req: Request, res: Response) => {
    const { id } = req.params;

    const recipe = await Recipe.findByPk(id)

    await recipe!.destroy()
    
    console.log(recipe)

    res.status(200).json({ msg: `recipe id: ${id} deleted`})
}  