const router = require("express").Router();
const {registration,login} = require("../controller/user.ctrl");
router.post("/registration",registration);
router.post("/login",login);
module.exports = router;