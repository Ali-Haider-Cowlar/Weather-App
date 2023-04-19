const axios = require("axios");
const config = require("../config/config");

module.exports.getWeather = async (req, res) => {
  
  const { longitude, latitude } = req.query;

  try {
    const { data } = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${config.apiKey}&q=${latitude},${longitude}`
    );
    // Send weather data to client
    res.send({
      name: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      pressure: data.current.pressure_mb,
      wind_speed: data.current.wind_mph,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching weather data" });
  }
}

