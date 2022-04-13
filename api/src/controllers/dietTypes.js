// [ ] GET /types:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados
// por spoonacular acá https://spoonacular.com/food-api/docs#Diets
const { Diet } = require('../db')
const {  getApiInfo } = require("./utils")
const getApiTipos = async (req,res) =>{
    //const api = await axios.get(`https://pokeapi.co/api/v2/type`)
    const apiInfo = await getApiInfo()
    //const tiposApi = await apiInfo.data.results.map( t => t.name)
    //console.log(api)
    apiInfo.forEach( d => {
         Diet.findOrCreate({
            where: {
                name:d.diet.toString().split(',').join(' ')
            }
        })
    })
    //console.log(apiInfo)
    const tiposAll = await Diet.findAll();
    res.status(200).json({msg: 'datos ingresados'})
}

// const dietTypes = async (req,res) =>{
//     const allDiets = await getApiDiets()
//     const map1 = allDiets.map( r => r.diet )
//     const map2 = map1.map( diets => {
//          for(let i = 0 ; i < diets.length ; i++){
//              return diets[i]
//          }
//     })
    
//     console.log(map2)
//     res.status(200).json({allDiets: allDiets, map1: map1, map2: map2})
// }



module.exports = getApiTipos