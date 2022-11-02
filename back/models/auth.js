const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const { threadId } = require("worker_threads")

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Por favor ingrese el nombre"],
        maxlength: [120, "Nombre no puede exceder los 120 caracteres"]
    },
    email: {
        type: String,
        required: [true, "Por favor ingrese el correo electronico"],
        unique: true,
        validate: [validator.isEmail, "Por favor ingrese un email valido"]
    },
    password: {
        type: String,
        required: [true, "Por favor registre una contraseña"],
        minlength: [8, "Tu contraseña no puede tener menos de 8 caracteres"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date

})

//esta parte encripta la contraseña antes de guardarla
usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//Desencriptacion o decodifiacion de contraseñas y comparamos

usuarioSchema.methods.compararPass = async function (passDada) {
    return await bcrypt.compare(passDada, this.password)
}

//Retornar unJWT token
//Se neceita cuando se regitre en la we y cuando inicie sesion

usuarioSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIEMPO_EXPIRACION
    })
}

//Generar un token para reset de contraseña
usuarioSchema.methods.genResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')

    //hashear y setear resetToken
    //hashear
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')
    //setear
    //this.resetPasswordToken = resetToken

    //setear fecha de expiracion del token
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000 //el token dura 30 min
    return resetToken
}

module.exports = mongoose.model("auth", usuarioSchema)