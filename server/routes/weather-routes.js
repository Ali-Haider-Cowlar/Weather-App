const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weather-controller");
const verifyToken = require("../middleware/verifyToken");

router.get("/weather",  weatherController.getWeather);

module.exports = router;
