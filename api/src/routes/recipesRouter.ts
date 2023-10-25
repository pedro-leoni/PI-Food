import {Router} from "express";
import {getByQuery, getRecipeById, saveRecipe, deleteRecipe} from "../controllers/recipes"
import {apiDietTypes} from "../controllers/diets"

const recipesRouter = Router();

recipesRouter.get('', getByQuery);
recipesRouter.get('/:id', getRecipeById);
recipesRouter.get('/types', apiDietTypes);

recipesRouter.post('', saveRecipe);

recipesRouter.delete('/:id', deleteRecipe);


export default recipesRouter;