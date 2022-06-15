import { GET_ALL_RECIPES, GET_BY_QUERY, ORDER_BY_NAME, FILTER_BY_DIET, ORDER_BY_RATE,CREATE_RECIPE, GET_DIETS, GET_DETAILS, ERROR_IN_QUERY, CLEAR_DETAIL } from "../actions";

const initialState = {
    recipes: [],
    recipesAux: [], 
    diets: [],
    recipeDetail: {},
    error: {}
}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                recipesAux: action.payload
            }
        case GET_BY_QUERY:
            return{
                ...state,
                recipes: action.payload,
                recipesAux: action.payload
            }
        case ORDER_BY_NAME:
            // alfAs , alfDesc
            if(action.payload === 'alfAs' || action.payload ==='alfDesc'){
                let sortedArr = action.payload === 'alfAs' ?
                    state.recipes.sort( (a,b) => {
                        if(a.name > b.name) {
                            return 1;
                        } 
                        if(b.name > a.name) {
                            return -1;
                        }
                        return 0
                    }) : 
                    state.recipes.sort((a,b) => {
                        if(a.name > b.name){
                            return -1
                        }
                        if(b.name > a.name) {
                            return 1;
                        }
                        return 0
                    })
                    //console.log(sortedArr)
                    return {
                        ...state,
                        recipes: sortedArr
                    }
            } else {
                return {
                    ...state,
                }
            }

        case ORDER_BY_RATE:
            // rateAs , rateDes
            if(action.payload === 'rateAs' || action.payload ==='rateDes'){
                let sortedArr1 = action.payload === 'rateAs' ?
                    state.recipes.sort((a,b) => {
                        return a.rate - b.rate
                    }) :
                    state.recipes.sort((a,b) => {
                        return b.rate - a.rate
                    })
                return {
                    ...state,
                    recipes: sortedArr1 
                }
            } else {
                return {
                    ...state
                }
            }

            
        case CREATE_RECIPE:
            return{
                ...state,
            }
        case GET_DIETS:
            return{
                ...state,
                diets: action.payload
            }
        case GET_DETAILS:
            return{
                ...state,
                recipeDetail: action.payload
            }
        case FILTER_BY_DIET:
            if(action.payload !== '-'){
                const filtered = state.recipesAux.filter((e) => e.diets.includes(action.payload))
                return{
                    ...state,
                    recipes: filtered
                }
            } else {
                return{
                    ...state
                }
            }

        case ERROR_IN_QUERY:
            return{
                ...state,
                error: action.payload
            }
        case CLEAR_DETAIL:
            return{
                ...state,
                recipeDetail: {}
            }
            
        
        default:
            return state
    }
}

export default rootReducer