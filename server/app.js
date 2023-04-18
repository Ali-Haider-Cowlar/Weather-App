require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-routes");

const connectDB = require('./config/dbConn');
const PORT = process.env.MONGO_PORT || 5000;

connectDB();

const cors = require("cors");
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/user", userRoutes); // localhost:5000/user

//Database Connection
mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Connected to MongoDB: Server running on port ${PORT}`));
});
