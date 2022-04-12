const { getAllInfo } = require('./utils')
// [ ] GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado


const getByQuery = async (req, res) => {
    try{
        const queryName = req.query.name.toLowerCase()
        //console.log('QUERY ->    : ', queryName)
        const allRecipes = await getAllInfo();
        if(queryName) {
            const queryFilter = await allRecipes.filter( r => r.name.toLowerCase().includes(queryName.toLowerCase()))
            if(queryFilter.length){
                res.status(200).json(queryFilter)
            } else {
                res.status(404).json({msg: 'Receta no encontrada'})
            }
        }
    } catch(err) {
        res.status(404).json({msg: err})
    }
}


module.exports = getByQuery



// 
// const allRecipes = await getAllInfo();
// res.status(200).json({
//     status: 'va queriendo',
//     allRecipes: allRecipes.map( e => e)
// })