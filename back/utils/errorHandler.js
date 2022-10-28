class ErrorHandler extends Error{
    constructor (message, statusCode){ //genera un mensaje
        super(message);
        this.statusCode= statusCode

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports= ErrorHandler