const mongoose=require("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`Base de datos mongo conectada con el servidor: ${con.connection.host}`)
    }).catch(con => {
        console.log(`No se logro la conexion con la base de datos`)
    })
}
// si lo quiero usar o llamar en otro lado se tiene que crear un exportable
module.exports=connectDatabase;