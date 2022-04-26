import axios from 'axios';


export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_BY_QUERY = "GET_BY_QUERY";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATE = "ORDER_BY_RATE";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const GET_DIETS = "GET_DIETS";
export const GET_DETAILS = "GET_DETAILS";
export const ERROR_IN_QUERY = "ERROR_IN_QUERY";


export const getAllRecipes = () => {
    return async (dispatch) => {
        let respuesta = await axios('/recipes?name=')
        return dispatch ({
            type: GET_ALL_RECIPES,
            payload: respuesta.data
        })
    }
}
export const getByQuery = (name) => {
    return async (dispatch) => {
        try {
            let respuesta = await axios(`/recipes?name=${name}`)
            return dispatch ({
                type: GET_BY_QUERY,
                payload: respuesta.data
            })

        } catch(err) {
            alert('Recipe not found')
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

export const createNewRecipe = (payload) => {
    return async (dispatch) => {
        const post = await axios.post('/recipe',payload);
        return post
    }
}

export const getDiets = () => {
    return async (dispatch) => { 
        let respuesta = await axios('/types');
        return dispatch({
            type: GET_DIETS,
            payload: respuesta.data.allDiets
        })
        
    }
}

export const getDetails = (id) => {
    return async (dispatch) => {
        let respuesta = await axios(`/recipes/${id}`)
        return dispatch({
            type: GET_DETAILS,
            payload: respuesta.data
        })
    }
}

export const filterByDiet = (payload) => {
    return{ 
        type: FILTER_BY_DIET,
        payload
    }
}