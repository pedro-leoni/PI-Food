import {Router} from "express";
import {apiDietTypes} from "../controllers/diets"

const dietsRouter = Router();

dietsRouter.get('/types', apiDietTypes);

export default dietsRouter;