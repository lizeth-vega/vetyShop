
import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: []}, action) => {
    switch (action.type) {

        case ADD_TO_CART:
            const item = action.payload; //carga que llega de algun lado con la informacion del carrito

              //si existe un elemento en el carrito entonces solo agrega uno mas no todo el producto
            const isItemExist = state.cartItems.find(i => i.product === item.product)
          

            if (isItemExist) { //si existe
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i) // regrese los items del carro, y que los separe por iten donde i es un producto u si es = al producto que existe entonces agregue 1
                }
            } else { // sino
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]//agrege el producto a car items
                }
            }

        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload) //regresa una resta
            }

            case SAVE_SHIPPING_INFO:
                return{
                    ...state,
                   shippingInfo: action.payload
                }

        default:
            return state
    }
}