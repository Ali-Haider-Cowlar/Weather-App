/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-routes");
const weatherRoutes = require("./routes/weather-routes");

const verifyToken = require("./middleware/verifyToken");
const cookieParser = require("cookie-parser");
require("./mqtt-client");

const connectDB = require("./config/dbConn");
const PORT = process.env.MONGO_PORT || 5000;

connectDB();

const cors = require("cors");
const app = express();

//Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors());

//Routes
app.use("/user", userRoutes); // localhost:5000/user
app.use("/api", verifyToken, weatherRoutes);

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

// ===========================================

const { InfluxDB, Point } = require("@influxdata/influxdb-client");

const token =
  "Ldo-y07TkYk_F0XqpDnc7RzYQctafuYNUFDp_gllQMvVBDTlcIeVVSwA44PtMSG6m24bH9fDHLHETZregpq6MA==";
const url = "http://influxdb2.docker:8086";
const org = "Cowlar";
const bucket = "weather";
const username = "user";
const password = "user123@asdkjhas8";

const { SetupAPI } = require("@influxdata/influxdb-client-apis");

(async () => {
  console.log("*** ONBOARDING ***");
  const setupApi = new SetupAPI(new InfluxDB({ url }));
  try {
    const { allowed } = await setupApi.getSetup();
    console.log('0.');
    if (allowed) {
      await setupApi.postSetup({
        body: {
          org,
          bucket,
          username,
          password,
          token,
        },
      });
      console.log(`1. InfluxDB '${url}' is now onboarded.`);
    } else {
      console.log(`2. InfluxDB '${url}' has been already onboarded.`);
    }
    console.log("\n 3. Finished SUCCESS");
  } catch (e) {
    console.error(e);
    console.log("\n 4. Finished ERROR");
  }
});

(async () => {
  const writeApi = new InfluxDB({ url, token }).getWriteApi(org, bucket, "ns");

  const point2 = new Point("temperature")
    .tag("example", "write.ts")
    .floatField("value", 10 + Math.round(100 * Math.random()) / 10)
    .timestamp(new Date()); // can be also a number, but in writeApi's precision units (s, ms, us, ns)!
  writeApi.writePoint(point2);
  // console.log(` ${point2.toLineProtocol(writeApi)}`);

  try {
    await writeApi.close();
    console.log("FINISHED ... now try ./query.ts");
  } catch (e) {
    console.error({ e });
    // if (e && e?.statusCode === 401) {
    //   console.log("Run ./onboarding.js to setup a new InfluxDB database.");
    // }
    console.log("\nFinished ERROR");
  }
})();
