const router = require("express").Router();
const {login} = require("../controller/admin.ctrl");
router.post("/login",login);
module.exports = router;