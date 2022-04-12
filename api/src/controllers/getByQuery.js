const { getAllInfo,getApiInfo,getDbInfo } = require('./utils')
// [ ] GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado


const getByQuery = async (req, res) => {
    //const queryName = req.query.name
    
    try{
        const allRecipes = await getAllInfo();
        res.status(200).json({
            status: 'success',
            allRecipes: allRecipes.map( e => e)
        })

    } catch(err) {
        res.status(404).json({msg: err})
    }
    // if (queryName){
    //     const queryFilter = await allRecipes.filter( r => r.name.toLowerCase().includes(queryName.toLowerCase()))
    //     if(queryFilter.length){
    //         res.status(200).json(queryFilter)
    //     } else {
    //         res.status(404).send('Receta no encontrada')
    //     }
    // } else {
    //     res.status(200).send(allRecipes)
    // }

}


module.exports = getByQuery