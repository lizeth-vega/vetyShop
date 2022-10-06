const expres = require("express");
const app = expres();

app.use(expres.json());
//importar rutas
const productos= require("./routes/products")
app.use('/api', productos) //sujeto a decisión

module.exports = app;