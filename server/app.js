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

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/user", userRoutes); // localhost:5000/user

//Influx DB
// const influx = new Influx.InfluxDB({
//   host: config.influx.host,
//   port: config.influx.port,
//   database: config.influx.database,
// });
// const influx = new Influx.InfluxDB({
//   host: config.influx.host,
//   port: config.influx.port,
//   database: config.influx.database,
// });
app.get("/api/weather", async (req, res) => {
  const { longitude, latitude } = req.query;
  const { longitude, latitude } = req.query;

  try {
    const { data } = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${config.apiKey}&q=${latitude},${longitude}`
      `http://api.weatherapi.com/v1/current.json?key=${config.apiKey}&q=${latitude},${longitude}`
    );
    // Write weather data to InfluxDB
    // await influx.writePoints([
    //   {
    //     measurement: "weather",
    //     fields: {
    //       name: data.location.name,
    //       temperature: data.current.temp_c,
    //       condition: data.current.condition.text,
    //       pressure: data.current.pressure_mb,
    //       wind_speed: data.current.wind_mph,
    //     },
    //     timestamp: new Date(),
    //   },
    // ]);

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
});

//Database Connection

async function startServer() {
  await mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

app.listen(PORT, () =>
  console.log(`Connected to MongoDB: Server running on port ${PORT}`)
);

module.exports = { app, startServer };
