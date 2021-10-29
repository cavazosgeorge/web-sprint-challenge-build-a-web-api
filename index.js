//Pull your server into this file and start it!
const express = require("express");
const app = require("./api/server");

const dotenv = require("dotenv");

// SETTING UP CONFIG.ENV FILE VARIABLES
dotenv.config({
  path: "./config/config.env",
});

// HANDLING UNCAUGHT EXCEPTION ERRORS
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

// SETUP BODY PARSER
app.use(express.json());

// SERVER INFORMATION
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// HANDLING UNHANDLED PROMISE REJECTION ERROR
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
