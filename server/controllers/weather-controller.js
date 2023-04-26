/* eslint-disable no-undef */
const config = require("../config/config");
const axios = require("axios");
const { Point } = require("@influxdata/influxdb-client");
const { influx } = require("../influxdb");
const writeApi = influx.getWriteApi();

module.exports.getWeather = async (req, res) => {

  const { longitude, latitude } = req.query;

  try {
    const { data } = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${config.apiKey}&q=${latitude},${longitude}`
    );
    const { pressure_mb, wind_mph } = data.current;
    const location = data.location.name;
    const temperature = data.current.temp_c;
    const point = new Point("weather")
      .tag("location", location)
      .floatField("temperature", temperature)
      .floatField("pressure", pressure_mb)
      .floatField("wind_speed", wind_mph);
    writeApi.writePoint(point);
    res.send({
      name: location,
      temperature: temperature,
      condition: data.current.condition.text,
      pressure: pressure_mb,
      wind_speed: wind_mph,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching weather data" });
  }
};
