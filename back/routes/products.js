const express = require("express")
const router = express.Router();

//constante de tipo arreglo
const {getProducts} = require("../controllers/productsController")// traemos la respuesta json desde el controlador
router.route('/productos').get(getProducts) //establecemos desde que ruta queremos ver el getProducts
module.exports = router;