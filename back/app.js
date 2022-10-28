const expres = require("express");
const app = expres();
const errorMiddleware = require("./middlerware/errors")

app.use(expres.json());
//importar rutas
const productos = require("./routes/products")
const usuarios = require("./routes/auth")
app.use('/api', productos) //sujeto a decisión
app.use('/api', usuarios) //sujeto a decisión
//Middelware para manejo de errores
app.use(errorMiddleware)

module.exports = app;