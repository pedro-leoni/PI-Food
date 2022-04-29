import { createStore, applyMiddleware} from 'redux';
import { composeWithDevtools } from 'redux-devtools-extension';
import  rootReducer  from '../reducers';
import thunk from 'redux-thunk';


// hay que solucionar cambiando algo aca, no arranca en las pcs que no tienen instalado redux devtools



const store = createStore(
    rootReducer,
    composeWithDevtools(applyMiddleware(thunk))
)

export default store