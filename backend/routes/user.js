const express = require("express")
const router = express.Router()
const {registerUserHandler, loginUserHandler} = require("../controllers/user")

router.post("/register", registerUserHandler);
router.post("/login", loginUserHandler);

module.exports = router