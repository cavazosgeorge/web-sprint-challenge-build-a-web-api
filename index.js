//Pull your server into this file and start it!
const express = require("express");
const app = express();

const dotenv = require("dotenv");

const errorMiddleware = require("./api/middlewares/errors");
const ErrorHandler = require("./utils/errorHandler");

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

// IMPORTING ALL ROUTES
const projects = require("./api/projects/projects-router");

// USE ALL ROUTES
app.use("/api", projects);

// HANDLE UNHANDLED ROUTES
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

// MIDDLEWARE => HANDLE ERRORS
app.use(errorMiddleware);

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
