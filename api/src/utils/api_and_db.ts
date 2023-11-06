import axios from "axios";
import Recipe from "../models/Recipe"; 
import Diet from "../models/Diet";
import NodeCache from "node-cache";
// TODO: manage API_KEY service 
const { API_KEY, API_KEY1, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6, API_KEY7, API_KEY8, API_KEY9 } = process.env;

export const recipesCache = new NodeCache()
// RODO: homogeneizar el get de la api con el de la db
export const getApiInfo = async(search: string) => {
    const apiGet = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&number=100&&addRecipeInformation=true&apiKey=${API_KEY8}`)
    const apiInfo = apiGet.data.results.map( (r: any) => {
        return{
            id: r.id,
            name: r.title,
            resume: r.summary,
            rate: r.spoonacularScore,
            healthy_level: r.healthScore,
            instructions: r.analyzedInstructions.map( (i: {steps: string}) => i.steps ),
            diets: r.diets.map((d: string) => d),
            img: r.image
        }
    })
    return apiInfo
}

export const fixDbInfo = async (search: string) => {
    try{
        const fixDbInfo = await Recipe.findAll({include: Diet})
        const fixedDbInfo = fixDbInfo.map( (e: any) => {
            const fixedDiets = []
            for( let i = 0 ; i < e.dataValues.diets?.length ; i++){
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
    }catch(err){
        console.log(err)
        throw Error('Problema cargando los datos(tipar error)')
    }
}


export const getAllInfo = async (search: string | undefined) => {
    const query = search ? search : ''
    let recipesCacheGet = recipesCache.get("recipes")
    if(recipesCacheGet == undefined){
        const apiInfo = await getApiInfo(query)
        //console.log('APIINFO-------------------------------------->\n'+ apiInfo)
        //const dbInfo = await getDbInfo()
        const dbInfo = await fixDbInfo(query)
        //console.log('DBINFO-------------------------------------->\n'+ dbInfo)
        const allInfo = apiInfo.concat(dbInfo)
        //console.log('ALLINFO-------------------------------------->\n'+ allInfo)
        recipesCache.set("recipes", allInfo)
        return allInfo
    } else {
        return recipesCacheGet
    }
}
