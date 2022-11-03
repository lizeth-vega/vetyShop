const expres = require("express");
const { registroUsuario, 
    loginUser, 
    logOut, 
    forgotPassword, 
    resetPassword, 
    getUserProfile, 
    updatePassword, 
    updateProfile, 
    getAllUsers, 
    getUserDetails, 
    updateUser } = require("../controllers/authController");
const { isAuthenticateUser, authorizeRoles } = require("../middlerware/auth");
const router = expres.Router();

router.route('/usuario/registro').post(registroUsuario)
router.route('/login').get(loginUser)
router.route('/logout').get(isAuthenticateUser, logOut) //debe estra aytenticad para cerrar sesion
router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:token').post(resetPassword)
router.route('/yo').get(isAuthenticateUser, getUserProfile)
router.route('/yo/updatePassword').put(isAuthenticateUser, updatePassword)
router.route('/yo/updateProfile').put(isAuthenticateUser, updateProfile)

//RUTAS ADMIN
router.route('/admon/allUsers').get(isAuthenticateUser, authorizeRoles("admin"), getAllUsers)
router.route('/admon/user/:id').get(isAuthenticateUser, authorizeRoles("admin"), getUserDetails)
router.route('/admon/updateuser/:id').put(isAuthenticateUser, authorizeRoles("admin"), updateUser)

module.exports = router