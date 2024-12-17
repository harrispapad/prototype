const express = require("express");
const { login } = require("../login/authControllers");
const router = express.Router();

router.post("/api/login", login);
router.post("/api/failedLogin", login);

module.exports = router;
