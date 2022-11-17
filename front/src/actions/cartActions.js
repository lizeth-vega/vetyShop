import axios from 'axios'
import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from '../constants/cartConstants'

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/producto/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: id,
            nombre: data.product.nombre,
            precio: data.product.precio,
            imagen: data.product.imagen[0].url,// va aasei xq es un arreglo osea varias imagenes
            inventario: data.product.inventario,
            quantity //el ususario selecciona la cantidad de productos
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const saveShippingInfo = (data) => async (dispatch) => {
    //guarda la informacion del cuando se le de comprar en el localstorage
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))

}