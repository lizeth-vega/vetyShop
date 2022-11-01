//crear y enviar un token guardado en una ruta

const tokenEnviado = (user, statusCode, res) => {
    //creamos el token
    const token = user.getJwtToken();

    //configurar token para enviarlo por la cookie para que se pa cuanto va a durar
    const Opciones = {
        expires: new Date(        //tiempo en milisegundo para el navegador
            Date.now() + process.env.COOKIE_EXPIRES_TIME*24*60*60*1000 //tiempo en milisegundo para el navegador lo pueda interpretar
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie("token", token, Opciones).json({
        success: true,
        token,
        user
    })


}

module.exports = tokenEnviado;