const mongoose = require("mongoose");
const dns = require("dns");
const dotenv = require("dotenv");
dotenv.config();

// Fix for Windows c-ares DNS resolution with MongoDB Atlas SRV records
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connection = mongoose.connect(process.env.MONGO_URL);
module.exports = connection;
