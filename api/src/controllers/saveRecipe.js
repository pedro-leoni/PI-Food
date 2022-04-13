// [ ] POST /recipe:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos
const {Recipe, Diet} = require('../db')

const saveRecipe = async (req,res) => {
    const {

        name,
        resume,
        rate,
        healthy_level,
        instrucions,
        createdInDb,
        diet
    } = req.body
    const newRecipe = await Recipe.create({

        name,
        resume,
        rate,
        healthy_level,
        instrucions,
        createdInDb
    })
    const dietInfo = await Diet.findAll({
        where: {
            name: diet
        }
    })
    newRecipe.addDiet(dietInfo)
    res.send('yo soy xeneize de la cuna al cajon')

}

module.exports = saveRecipe