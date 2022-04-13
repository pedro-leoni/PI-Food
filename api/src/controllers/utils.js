const axios = require('axios');
require('dotenv').config();
const { API_KEY2 } = process.env;
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
            //instructions: r.analyzedInstructions.map( i => i.steps ),
            diet: r.diets.map( d => d),
            img: r.image
        }
    })
    return apiInfo
}

const getApiDiets = async(req, res) => {
    const apiGet = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=&number=5000&addRecipeInformation=true&apiKey=${API_KEY2}`)
    const tipos = []
    const apiDiets = await apiGet.data.results.map( r => r.diets )
    apiDiets.forEach(d =>  {
        d.forEach( e => {
            tipos.push(e)
        })
    })
    
    //console.log('apidiets \n',apiDiets)
    tipos.forEach( d => {
        Diet.findOrCreate({
            where: {
                name: d
            }
        });
    })
    res.status(200).send('termine')
    

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
    getAllInfo,
    getApiDiets
    
}