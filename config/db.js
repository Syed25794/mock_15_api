const mongoose = require("mongoose");

require("dotenv").config();

mongoose.set("strictQuery", false);

const { MONGO_URL } = process.env;

const connection = mongoose.connect(MONGO_URL);

module.exports = connection ;