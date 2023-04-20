require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-routes");
const weatherRoutes = require("./routes/weather-routes");
const Influx = require("influx");
const verifyToken = require("./middleware/verifyToken");
const cookieParser = require("cookie-parser");


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
