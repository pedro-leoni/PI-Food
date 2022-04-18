import { GET_ALL_RECIPES, ORDER_BY_NAME, FILTER_BY_DIET, ORDER_BY_RATE } from "../actions";

const initialState = {
    recipes: [],
    recipesAux: [], 
}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                recipesAux: action.payload
            }
        case ORDER_BY_NAME:
            // alfAs , alfDesc
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
        case ORDER_BY_RATE:
            // rateAs , rateDes
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
            

            
        
        default:
            return state
    }
}

export default rootReducer