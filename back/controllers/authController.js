const User = require("../models/auth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlerware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")


//Registrar un nuevo usuario /api/usuario/registro

exports.registroUsuario = catchAsyncErrors(async (req, res, next) => {
    const { nombre, email, password } = req.body;

    const user = await User.create({ //esto es uun objeto de tipo usuario
        nombre,
        email,
        password,
        avatar: {
            public_id: "imagen de avatar",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ&usqp=CAU"
        }
    })


    //CUANDO ELUSUSARIO SE REGISTRA GENERA UN TOKEN
    tokenEnviado(user, 201, res)
})

//METODO DE INICIO DE SESION
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //revisar si los campos estan completos
    if (!email || !password) {
        return next(new ErrorHandler("Por favor ingrese email & Contraseña", 400))

    }
    //Buscar al usuario en la BD
    const user = await User.findOne({ email }).select("+password") //lo busca  por el parametro email y traigase el password
    // si no lo encuentra , user
    if (!user) {
        return next(new ErrorHandler("Email o contraseña invalidos", 401))
    }


    //Comparar contraseñas, verificar si sta bien
    const contrasenaOK = await user.compararPass(password);

    if (!contrasenaOK) {
        return next(new ErrorHandler("contraseña invalida"), 401)

    }

    tokenEnviado(user, 200, res)

})

//cerrar sesion(logout)

exports.logOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Cerró sesión"
    })
})

//olvide mi contraseña, recuperar contraseña
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("Usuario no se encuentra registrado", 404))

    }
    const resetToken = user.genResetPasswordToken();
    await user.save({ validateBeforeSave: false })

    //Crear una url para hacer el reset de la contraseña

    const resetUrl = `${req.protocol}://${req.get("host")}/api/resetPassword/${resetToken}`;
    const mensaje = ` Hola!..\n\n Tu link para ajustar una nueva contraseña 
    es el siguiente:  \n\n${resetUrl}\n\n Si no solicitaste este link, por favor comunicate con soporte.\n\n Att: Vetyshop Store `

    try {
        await sendEmail({
            email: user.email,
            subject: "VetyShop Recuperación de la contraseña",
            mensaje
        })
        res.status(200).json({
            success: true,
            message: `Correo enviado a: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
})

//Resetear la contraseña
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //Hash el token que llego con la url
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    //Buscamos al usuario al que le vamos a resetear la contraseña
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() } //la fecha de expiracion sea mayor al momento que se esta tratando de resetear la contraseña de lo contrario ya esat vencido el token 
    })
    //El usuario si esta en la base de datos?
    if (!user) {
        return next(new ErrorHandler("El token es invalido o ya expiró", 400))
    }
    //Diligenciamos bien los campos?
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Contraseñas no coinciden", 400))
    }

    //Setear la nueva contraseña
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    tokenEnviado(user, 200, res)
})
