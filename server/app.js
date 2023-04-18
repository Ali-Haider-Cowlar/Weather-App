require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-routes");
const axios = require("axios");
const Influx = require("influx");
const config = require("./config/config");

const connectDB = require("./config/dbConn");
const PORT = process.env.MONGO_PORT || 5000;

connectDB();

const cors = require("cors");
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/user", userRoutes); // localhost:5000/user

//Influx DB
const influx = new Influx.InfluxDB({
  host: config.influx.host,
  port: config.influx.port,
  database: config.influx.database,
});
app.get("/api/weather", async (req, res) => {
    console.log(req.query.lat)
  try {
    console.log("ABCD");
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=${config.apiKey}`
    );
    console.log("EFFFFF");

    // Write weather data to InfluxDB
    await influx.writePoints([
      {
        measurement: "weather",
        tags: {
          location: `${req.query.lat},${req.query.lon}`,
        },
        fields: {
          temperature: data.main.temp,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          wind_speed: data.wind.speed,
        },
        timestamp: new Date(),
      },
    ]);

    // Send weather data to client
    res.send({
      temperature: data.main.temp,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind_speed: data.wind.speed,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching weather data" });
  }
});

//Weather API
app.get("/api/weather", async (req, res) => {
  console.log("AAAA");
  try {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=${config.apiKey}`
    );

    res.send({
      temperature: data.main.temp,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind_speed: data.wind.speed,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching weather data" });
  }
});

//Database Connection
mongoose.connection.once("open", () => {
  app.listen(PORT, () =>
    console.log(`Connected to MongoDB: Server running on port ${PORT}`)
  );
});
