const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) =>{
    err.statusCode= err.statusCode || 500; //cuando le llegue un codigo que sea 500 y mensaje "internal server error" lo reconozca se lo envia al error handler,
    // este lo cree y hay un trazabilidad  de el y que el programador pueda saber que error es
    err.message= err.message || "Internal Server Error"

    res.status(err.statusCode).json({
        success:false,
        message: err.stack
    })

}