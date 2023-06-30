import {Router} from "express";

import {getByQuery} from "../controllers/getByQuery"
import {getRecipeById} from "../controllers/getRecipeById"
import {saveRecipe} from "../controllers/saveRecipe"
import {apiDietTypes} from "../controllers/dietTypes"
import {deleteRecipe} from "../controllers/deleteRecipe"


const recipesRouter = Router();

recipesRouter.get('', getByQuery);
recipesRouter.get('/:id', getRecipeById);
recipesRouter.get('/types', apiDietTypes);

recipesRouter.post('', saveRecipe);

recipesRouter.delete('/:id', deleteRecipe);


export default recipesRouter;