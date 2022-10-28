const expres = require("express");
const { registroUsuario } = require("../controllers/authController");
const router= expres.Router();

router.route('/usuario/registro').post(registroUsuario)

module.exports = router