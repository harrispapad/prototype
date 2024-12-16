const express = require("express");
const { login } = require("../login/authControllers");
const router = express.Router();

router.post("/login", login);

module.exports = router;
