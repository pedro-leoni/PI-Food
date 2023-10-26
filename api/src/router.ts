import { Router } from 'express';

import recipesRouter from './routes/recipesRouter';
import dietsRouter from './routes/dietsRouter';

const publicRouter = Router();

publicRouter.use("/recipes", recipesRouter)
publicRouter.use("/diets", dietsRouter)

export {publicRouter}
