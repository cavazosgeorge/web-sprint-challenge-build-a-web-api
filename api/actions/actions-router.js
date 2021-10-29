// Write your "actions" router here!
const express = require("express");
const { validateId, validateBody } = require("./actions-middlware");
const router = express.router();
const Actions = require("./actions-model");

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

router.get("/:id", validateId, (req, res, next) => {
  Actions.get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(next);
});

router.post("/", validateBody, (req, res, next) => {
  Actions.insert(req.body)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});
