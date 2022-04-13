const { getAllInfo } = require('./utils')
// [ ] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados


const getRecipeById = async (req, res) => {
    const { id } = req.params   
    try{
        const allRecipes = await getAllInfo()
        //console.log( '\nALLRECIPES          ->      ', allRecipes,'\nPARAM      ->    ', id)
        if(id){
            const find = allRecipes.find( r => r.id == id )
            res.status(200).json(find)
        } else {
            res.status(404).json({msg: 'No se encontro la receta con el ID especificado'})
        }
    }catch(err){
        res.status(404).json({msg: `debes especificar un ID`})
    }

}   


module.exports = getRecipeById