const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getByQuery = require('../controllers/getByQuery');
const getRecipeById = require('../controllers/getRecipeById');
const saveRecipe = require('../controllers/saveRecipe');
const { getApiDiets } = require('../controllers/utils')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes', getByQuery)
router.get('/recipes/:id', getRecipeById)
router.get('/types', getApiDiets)
router.post('/recipe', saveRecipe)



module.exports = router;
