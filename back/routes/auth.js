const expres = require("express");
const { registroUsuario, loginUser } = require("../controllers/authController");
const router= expres.Router();

router.route('/usuario/registro').post(registroUsuario)
router.route('/login').get(loginUser)

module.exports = router