const User = require("../models/auth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middlerware/catchAsyncErrors")

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
    res.status(201).json({
        success: true,
        user
    })
})