const express = require("express");
const app = express();
const cors = require("cors");

const projectRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

const errorMiddleware = require("./middlewares/errors");

app.use(express.json());
app.use(cors());

app.use("/api/projects", projectRouter);
app.use("/api/actions", actionsRouter);

// Handle ERRORS
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = app;
