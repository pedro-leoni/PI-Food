// [ ] GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados
// por spoonacular acá https://spoonacular.com/food-api/docs#Diets
const { Diet } = require('../db')
const axios = require('axios');
require('dotenv').config();
const { API_KEY2 } = process.env;



const apiDietTypes = async (req,res) =>{
    try{
        const allDiets = await Diet.findAll();
        if(allDiets.length){
            res.status(200).json({msg: 'Los datos ya han sido ingresados', allDiets})
        } else {
            const apiGet = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=&number=5222&addRecipeInformation=true&apiKey=${API_KEY2}`)
            const apiDiets = await apiGet.data.results.map( r => r.diets )
            const diets = []
            apiDiets.forEach(d =>  {
                d.forEach( (e) => {
                    diets.push(e)
                })
            })
            diets.forEach( d => {
                Diet.findOrCreate({
                    where: {
                        name: d
                    }
                });
            })
            const allDiets = await Diet.findAll();
            res.status(200).json({msg: 'Datos ingresados correctamente', allDiets})
        }
    } catch(err) {
        res.status(404).json({msg: `dietTypes esta entrando al error, Seguro caduco la apiKey`, error: err})
    }


}





module.exports = apiDietTypes