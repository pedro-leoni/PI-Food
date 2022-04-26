const axios = require('axios');
require('dotenv').config();
const { API_KEY, API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6, API_KEY7, API_KEY8, API_KEY9 } = process.env;
const { Recipe, Diet} = require('../db');



const getApiInfo = async() => {
    const apiGet = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=&number=100&addRecipeInformation=true&apiKey=${API_KEY2}`)
    const apiInfo = await apiGet.data.results.map( r => {
        return{
            id: r.id,
            name: r.title,
            resume: r.summary,
            rate: r.spoonacularScore,
            healthy_level: r.healthScore,
            instructions: r.analyzedInstructions.map( i => i.steps ),
            diets: r.diets.map( d => d),
            img: r.image
        }
    })
    return apiInfo
}




// SI LA DESCOMENTO LA TENGO QUE VOLVER A EXPORTAR 
//
// de Diet traeme nombre mediante los atributos
// const getDbInfo = async() => {
//     return await Recipe.findAll({
//         include:{
//             model: Diet,
//             attributes: ['name'],
//             through: {
//                 attributes: [],
//             }
//         }
//     })
// }

const fixDbInfo = async () => {
    const fixDbInfo = await Recipe.findAll({include: Diet})
    const fixedDbInfo = fixDbInfo.map( (e) => {
        const fixedDiets = []
        for( let i = 0 ; i < e.dataValues.diets.length ; i++){
            fixedDiets.push(e.dataValues.diets[i].dataValues.name)
        }
        return{
            id: e.dataValues.id,
            name: e.dataValues.name,
            resume: e.dataValues.resume,
            instructions: e.dataValues.instructions,
            rate: e.dataValues.rate,
            healthy_level: e.dataValues.healthy_level,
            img: e.dataValues.img,
            diets: fixedDiets
        }
    })
    return fixedDbInfo
}


const getAllInfo = async () => {
    const apiInfo = await getApiInfo()
    //console.log('APIINFO-------------------------------------->\n'+ apiInfo)
    //const dbInfo = await getDbInfo()
    const dbInfo = await fixDbInfo()
    //console.log('DBINFO-------------------------------------->\n'+ dbInfo)
    const allInfo = apiInfo.concat(dbInfo)
    //console.log('ALLINFO-------------------------------------->\n'+ allInfo)
    return allInfo
}

module.exports = {
    getApiInfo,
    getAllInfo,
    fixDbInfo


    
}