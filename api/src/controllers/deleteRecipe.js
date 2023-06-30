const { Recipe } = require('../db')




const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    const recipe = await Recipe.findByPk(id)

    await recipe.destroy()
    
    console.log(recipe)

    res.status(200).json({ msg: `recipe id: ${id} deleted`})
}   

module.exports = deleteRecipe;