const expres = require("express");
const { registroUsuario, loginUser, logOut, forgotPassword, resetPassword } = require("../controllers/authController");
const { isAuthenticateUser } = require("../middlerware/auth");
const router= expres.Router();

router.route('/usuario/registro').post(registroUsuario)
router.route('/login').get(loginUser)
router.route('/logout').get( isAuthenticateUser, logOut) //debe estra aytenticad para cerrar sesion
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:token').post(resetPassword)
module.exports = router