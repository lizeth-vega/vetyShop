const expres = require("express");
const app = expres();
const errorMiddleware = require("./middlerware/errors")
const cookieParser = require("cookie-parser")
const bodyParser =require('body-parser') //para que en una esquina del body se vea la foto
const fileUpload = require('express-fileupload')

//Uso de constantes importadas
app.use(expres.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());


//importar rutas
const productos = require("./routes/products")
const usuarios = require("./routes/auth")
const ordenes = require("./routes/orders")



app.use('/api', productos) //sujeto a decisión
app.use('/api', usuarios) //sujeto a decisión
app.use('/api', ordenes)//suejeto a decision



//Middelware para manejo de errores
app.use(errorMiddleware)

module.exports = app;