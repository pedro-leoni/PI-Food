const axios = require('axios');
const { API_KEY } = process.env;
const { Recipe, Diet} = require('../db');


const getApiInfo = async() => {
    const apiGet = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=&number=100&addRecipeInformation=true&apiKey=${process.env.API_KEY}`)
    const apiInfo = await apiGet.data.results.map( r => {
        return{
            id: r.id,
            name: r.title,
            resume: r.summary,
            rate: r.spoonacularScore,
            healthy_level: r.heathScore,
            instructions: r.analyzedInstructions.map( i => i.steps ),
            diet: r.diets.map( d => d),
            img: r.image
        }
    })
    return apiInfo
}




// de Diet traeme nombre mediante los atributos
const getDbInfo = async() => {
    return await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const getAllInfo = async () => {
    const apiInfo = await getApiInfo()
    //console.log('APIINFO-------------------------------------->\n'+ apiInfo)
    const dbInfo = await getDbInfo()
    //console.log('DBINFO-------------------------------------->\n'+ dbInfo)
    const allInfo = apiInfo.concat(dbInfo)
    //console.log('ALLINFO-------------------------------------->\n'+ allInfo)
    return allInfo
}

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllInfo
}