// [ ] POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos
const {Recipe, Diet} = require('../db')

const saveRecipe = async (req,res) => {
    try{
        const {
            name,
            resume,
            rate,
            healthy_level,
            instructions,
            img,
            createdInDb,
            diet
        } = req.body
        const newRecipe = await Recipe.create({
            name,
            resume,
            rate,
            healthy_level,
            instructions,
            img,
            createdInDb
        })
        const dietInfo = await Diet.findAll({
            where: {
                name: diet
            }
        })
        newRecipe.addDiet(dietInfo)
        res.json({msg: 'Receta creada con exito'})
    }catch(err){
        res.status(400).json({msg: err})
    }

}

module.exports = saveRecipe