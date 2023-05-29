/** @format */
const router = require("express").Router();
const { login_controller, register_controller } = require("../controller/auth");

router.post("/register", register_controller);

router.post("/login", login_controller);

module.exports = router;
