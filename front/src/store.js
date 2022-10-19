import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'; // dar un toque en el front 
import {composeWithDevTools} from 'redux-devtools-extension';
import { productsReducer } from './reducer/productReducer';
//
const reducer =combineReducers({
    products:productsReducer
})

let initialState ={}

const middleware =[thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
