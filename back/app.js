const expres = require("express");
const app = expres();
const errorMiddleware = require("./middlerware/errors")
const cookieParser = require("cookie-parser")

//Uso de constantes importadas
app.use(expres.json());
app.use(cookieParser());


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