
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const routes = require("./routes");


// const db = require("./models");
const API_PORT = process.env.PORT || 3001;
const app = express();
// const router = express.Router();

// this is our MongoDB database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googleBooks_db";

// connects our back end code with the database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
let dbConn = mongoose.connection;

// checks if connection with the database is successful
dbConn.once("open", () => console.log("MongoDB connection open"));
dbConn.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"));

// route for serving front end
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

app.listen(API_PORT, () => console.log(`🌎 listening on port ${API_PORT}`));