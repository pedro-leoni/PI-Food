import axios from 'axios';


export const GET_ALL_RECIPES = "GET_ALL_RECIPES";

export const getAllRecipes = () => {
    return async (dispatch) => {
        let respuesta = await axios('http://localhost:3001/recipes?name=R')
        return dispatch({
            type: GET_ALL_RECIPES,
            payload: respuesta.data
        })
    }
}