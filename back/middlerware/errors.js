const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; //cuando le llegue un codigo que sea 500 y mensaje "internal server error" lo reconozca se lo envia al error handler,
    // este lo cree y hay un trazabilidad  de el y que el programador pueda saber que error es
    err.message = err.message || "Internal Server Error"

    res.status(err.statusCode).json({
        success: false,
        message: err.stack
    })

    //Error de clave duplicada en mongoose

    if (err.code === 11000) {
        const message = `Clave duplicada  ${Object.keys(err.keyValue)}`
        error = new ErrorHandler(message, 400)
    }

    //Error en JWT
    if (err.name === "JsonWebTokenError") {
        //personalizar el mensaj de error
        const message = " Token de Json Web es invalido, intentelo de nuevo!"
        error = new ErrorHandler(message, 400)
    }
    //JWT token expirado
    if (err.name === "TokenExpiredError") {
        const message = "El token de JWT es vencido. Ta expiro. Intentalo de nuevo"
        error = new ErrorHandler(message, 400)

    }

}