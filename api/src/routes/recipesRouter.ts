import {Router} from "express";
import {getByQuery, getRecipeById, saveRecipe, deleteRecipe} from "../controllers/recipes"


const recipesRouter = Router();

recipesRouter.get('', getByQuery);
recipesRouter.get('/:id', getRecipeById);

recipesRouter.post('', saveRecipe);

recipesRouter.delete('/:id', deleteRecipe);


export default recipesRouter;