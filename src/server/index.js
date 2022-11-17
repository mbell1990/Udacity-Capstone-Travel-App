//const dotenv = require("dotenv");
//dotenv.config();

projectData = [];

//const fetch = require("node-fetch");
//var path = require("path");
const express = require("express");
//const mockAPIResponse = require("./mockAPI.js");

const app = express();

const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
const { response } = require("express");
app.use(cors());

app.use(express.static("dist"));

console.log(__dirname);

// allows get requests to be used in app

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
  res.sendFile(path.resolve("src/client/views/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log(`Example app listening on port 8081!`);
});

// ***  Routes and GET requests ***

// get request with callback - this gets the data required

app.get("/all", (req, res) => {
  res.send(projectData);
});

// Post Routes to receive data from API's on clientside

app.post("/geonames", (req, res) => {
  dataGeonames = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    city: req.body.city,
  };
  projectData.push(dataGeonames);
  res.send(projectData);
});

// WeatherBit Post Route

app.post("/weatherbit", (req, res) => {
  dataWeatherbit = {
    high: req.body.high,
    low: req.body.low,
    icon: req.body.icon,
    description: req.body.description,
  };
  projectData.push(dataWeatherbit);
  res.send(projectData);
});

// Pixabay Post Route

app.post("/pixabay", (req, res) => {
  dataPixabay = {
    image: req.body.image,
  };
  projectData.push(dataPixabay);
  res.send(projectData);
});
