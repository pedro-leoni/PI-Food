import axios from 'axios';


export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_BY_QUERY = "GET_BY_QUERY";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATE = "ORDER_BY_RATE";
export const FILTER_BY_DIET = "FILTER_BY_DIET";

export const getAllRecipes = () => {
    return async (dispatch) => {
        let respuesta = await axios('http://localhost:3001/recipes?name=R')
        return dispatch ({
            type: GET_ALL_RECIPES,
            payload: respuesta.data
        })
    }
}
export const getByQuery = (name) => {
    return async (dispatch) => {
        try {
            let respuesta = await axios(`http://localhost:3001/recipes?name=${name}`)
            return dispatch ({
                type: GET_BY_QUERY,
                payload: respuesta.data
            })

        } catch(err) {
            console.log(err)
        }
    }
}

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }

}

export const orderByRate = (payload) => {
    return {
        type: ORDER_BY_RATE,
        payload
    }
}
