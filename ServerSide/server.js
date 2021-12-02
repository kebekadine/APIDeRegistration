const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cors = require('cors')
app.use(cors());

require('dotenv').config();
const db = require("./models/db");
const route = require("./api/routes/route")

const port = process.env.PORT || 5000;
app.set('view engine');

app.use("/route", route);
