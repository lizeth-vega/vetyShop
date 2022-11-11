const app=require("./app")
const connectDatabase = require("./config/database");
const cloudinary =require("cloudinary")
//setear el archivo de configuracion
const dotenv=require("dotenv");

dotenv.config({path: 'back/config/config.env'}) // quiere decir que tiene un archivo de configuracion inicial

//configurar base de datos
connectDatabase();

//configurar cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
})


//escuchamos al servidor esto es una creacion de un metodo en java script este servidor necesita escuchar al puerto y configuracion que se creo en config.env
//llamemos al server
const server = app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en el puerto: ${process.env.PORT} en modo:  ${process.env.NODE_ENV}`)
})
 