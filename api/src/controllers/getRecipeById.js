const { getAllInfo, getDbInfo } = require('./utils')
const axios = require('axios')
require('dotenv').config();
const { API_KEY1 } = process.env;

// [ ] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados


// const getRecipeById = async (req, res) => {
//     const { id } = req.params   
//     try{
//         const allRecipes = await getAllInfo()
//         //console.log( '\nALLRECIPES          ->      ', allRecipes,'\nPARAM      ->    ', id)
//         if(id){
//             const find = allRecipes.find( r => r.id == id )
//             res.status(200).json(find)
//         } else {
//             res.status(404).json({msg: 'No se encontro la receta con el ID especificado'})
//         }
//     }catch(err){
//         res.status(404).json({msg: `debes especificar un ID`})
//     }

// }   
const getRecipeById = async (req, res) => {
    const { id } = req.params
        try{
            const recipesDb = await getDbInfo()
            const recipeDb = recipesDb.find(r => r.id === id)
            if(recipeDb){
                res.json({data: recipeDb})
            } else {
                const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY1}`
                const recipeApi = await axios(url)
                res.json({data: recipeApi.data})
            }
    } catch(err) {
        res.status(404).json({msg: 'Receta no encontrada'})
    } 
}
//https://api.spoonacular.com/recipes/716426/information?apiKey=7da230c804d642b8ad8c62c7a75accbf

module.exports = getRecipeById