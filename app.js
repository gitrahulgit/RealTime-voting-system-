const config = require("config");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const pollRoutes = require("./routes/poll");
const app = express();

// Set public folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS
app.use(cors());

app.use("/poll", pollRoutes);

mongoose.Promise = global.Promise;
console.log(config.mongo.url);

mongoose.connect(config.mongo.url, () => {
    console.log("Connected to mongo");
}).catch(err => console.log(err));

app.listen(3000, () => {
    console.log("Listening on port 3000");
});