import { Router } from 'express';

import recipesRouter from './routes/recipesRouter';

const publicRouter = Router();

publicRouter.use("/recipes", recipesRouter)

export {publicRouter}
