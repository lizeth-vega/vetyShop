const express = require("express")
const router = express.Router();

//constante de tipo arreglo
const {getProducts, newProduct, getProductsById, updateProduct, deleteProduct} = require("../controllers/productsController")// traemos la respuesta json desde el controlador
router.route('/productos').get(getProducts) //establecemos desde que ruta queremos ver el getProducts
router.route('/producto/nuevo').post(newProduct);//establecemos una ruta
router.route('/producto/:id').get(getProductsById); //los : es para decir que biene para los parametros de la ruta esta consulta porid
router.route('/producto/:id').put(updateProduct);// creacion de la ruta de la actualizacion
router.route('/producto/:id').delete(deleteProduct);// creacion de la ruta de la actualizacion

module.exports = router; 