import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // dar un toque en el front 
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer, productDetailsReducer, newProductReducer, productReducer } from './reducer/productReducer';
import { authReducer, forgotPasswordReducer, userReducer } from './reducer/userReducer';
import { cartReducer } from './reducer/cartReducer';


//
const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newProduct: newProductReducer,
    product: productReducer
})

let initialState = { //initialstate se conecta a la memoria local del navegador "guarda informacion temporal"
    cart: {
        cartItems: localStorage.getItem('cartItems') //busca el elemtno carItem que esta en localStorage pero antes
            ? JSON.parse(localStorage.getItem('cartItems')) // la analiza para que sea compatible, despues de eso si se almacena en cartItems y eso es lo que reducer busca y usa
            : [],
            shippingInfo: localStorage.getItem('shippingInfo') //busca el elemtno carItem que esta en localStorage pero antes
            ? JSON.parse(localStorage.getItem('shippingInfo')) // la analiza para que sea compatible, despues de eso si se almacena en cartItems y eso es lo que reducer busca y usa
            : []
    }
}


const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
