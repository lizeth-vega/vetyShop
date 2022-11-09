import axios from 'axios';
//importamos las constantes
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL

} from '../constants/productConstants';

//inicializamos una constante getProducts
export const getProducts = (currentPage = 1, keyword="", precio) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST })
        
        let link=`/api/productos?keyword=${keyword}&page=${currentPage}&precio[gte]=${precio[0]}&precio[lte]=${precio[1]}`
        //diccionario
        const { data } = await axios.get(link)//a partir del simbolo ? hay una pregunta y se relaciona con otra unida por &
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

// VER DETALLE DEL PRODUCTO  ENTONCES SE LE AGREGA EL ID
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/producto/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


//clear error

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}