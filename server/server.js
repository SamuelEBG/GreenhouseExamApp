const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mqttConnection = require('./mqttConnection');
const { createLoginRouter, requestUser } =  require("./routes/loginRouter.js");
const temperatureReadings = require("./routes/temperatureRoute");
const humidityReadings = require("./routes/humidityRoute");
const sunlightReadings = require("./routes/sunlightRoute");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("Connected to database"))
    .catch((error)=>console.error("Error: ", error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(requestUser());
app.use("/api/login", createLoginRouter());
app.use("/api/temperature", temperatureReadings);
app.use("/api/humidity", humidityReadings);
app.use("/api/sunlight", sunlightReadings);

/**
 In a single-page application (SPA), the entire application runs in the 
 browser as a single HTML file, and the UI is updated dynamically 
 by JavaScript code without reloading the page. 
 This means that the client-side routing is handled by JavaScript, and 
 the server needs to be configured to always serve the same 
 HTML file (usually called index.html) for any route that is not a defined API endpoint.
 */

// Use an absolute path for serving static assets
app.use(express.static(path.join(__dirname, '../client/dist')));

// Middleware. Use absolute paths for serving client-side HTML
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    } else {
        next();
    }
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listeing on http://localhost:${server.address().port}`);
});