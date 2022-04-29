import { createStore, applyMiddleware, compose } from 'redux';
import  rootReducer  from '../reducers';
import thunk from 'redux-thunk';


// hay que solucionar cambiando algo aca, no arranca en las pcs que no tienen instalado redux devtools



const store = createStore(
    rootReducer,
    compose( applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

export default store