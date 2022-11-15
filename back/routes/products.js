const express = require("express")
const router = express.Router();

//constante de tipo arreglo
const {getProducts, newProduct, getProductsById, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts} = require("../controllers/productsController");// traemos la respuesta json desde el controlador
const { isAuthenticateUser, authorizeRoles } = require("../middlerware/auth");
//probando autenticacion 01-nov
router.route('/productos').get(getProducts) //establecemos desde que ruta queremos ver el getProducts
router.route('/producto/:id').get(getProductsById); //los : es para decir que biene para los parametros de la ruta esta consulta porid
router.route("/review").put(isAuthenticateUser, createProductReview)
router.route('/reviews').get(isAuthenticateUser, getProductReviews)
router.route('/review').delete(isAuthenticateUser, deleteReview)
 
//rutas admin
router.route('/producto/nuevo').post(isAuthenticateUser, authorizeRoles("admin"),newProduct);//establecemos una ruta
router.route('/producto/:id').put(isAuthenticateUser, authorizeRoles("admin"), updateProduct);// creacion de la ruta de la actualizacion
router.route('/producto/:id').delete( isAuthenticateUser, authorizeRoles("admin"),deleteProduct);// creacion de la ruta de eliminacion
router.route('/producto/:id').get( isAuthenticateUser, authorizeRoles("admin"),getAdminProducts);// creacion de la ruta de la actualizacion

module.exports = router; 


