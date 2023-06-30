import { getAllInfo } from './utils';
import { Request, Response } from 'express';
// [ ] GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado


export const getByQuery = async(req: Request, res: Response) => {
    try{
        const queryName = (req.query.name! as string).toLowerCase()
        //console.log('QUERY ->    : ', queryName)
        const allRecipes = await getAllInfo();
        if(queryName) {
            const queryFilter = await allRecipes.filter( (r: any) => r.name.toLowerCase().includes(queryName.toLowerCase()))
            if(queryFilter.length){
                res.status(200).json(queryFilter)
            } else {
                res.status(404).json({msg: 'Receta no encontrada'})
            }
        } else {
            res.status(200).json(allRecipes)
        }
    } catch(err) {
        res.status(404).json({msg: err})
    }
}



// 
// const allRecipes = await getAllInfo();
// res.status(200).json({
//     status: 'va queriendo',
//     allRecipes: allRecipes.map( e => e)
// })