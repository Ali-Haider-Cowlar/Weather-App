/* eslint-disable no-undef */
const config = require("../config/config");
const axios = require("axios");
const { Point } = require("@influxdata/influxdb-client");
const { influx } = require("../influxdb");
const writeApi = influx.getWriteApi();
const client = require("../mqtt-client");

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

    const weatherData = {
      location: location,
      temperature: temperature,
      wind: wind_mph,
      pressure: pressure_mb,
    };
    client.publish("weather-station", JSON.stringify(weatherData));

    res.send({
      name: location,
      temperature: temperature,
      condition: data.current.condition.text,
      pressure: pressure_mb,
      wind_speed: wind_mph,
    });

    setInterval(() => {
      axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${config.apiKey}&q=${latitude},${longitude}`
      ).then(response => {
        const { data } = response;
        const { pressure_mb, wind_mph } = data.current;
        const location = data.location.name;
        const temperature = data.current.temp_c;
        const weatherData = {
          location: location,
          temperature: temperature,
          wind: wind_mph,
          pressure: pressure_mb,
        };
        client.publish("weather-station", JSON.stringify(weatherData));
      }).catch(error => {
        console.error(error);
      });
    }, 10000);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching weather data" });
  }
};
