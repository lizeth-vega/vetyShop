const User = require("../models/auth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlerware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");

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
    tokenEnviado(user,201,res)
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
        return next ( new ErrorHandler("contraseña invalida"), 401)
        
    }
    
    tokenEnviado(user,200,res)

})