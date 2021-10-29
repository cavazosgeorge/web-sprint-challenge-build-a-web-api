// Write your "projects" router here!
const express = require("express");
const { validateId, validateBody } = require("./projects-middleware");
const router = express.Router();
const Projects = require("../projects/projects-model");

// METHOD(GET) => /API/PROJECTS
router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

// METHOD(GET) => /API/PROJECTS/:ID
router.get("/:id", validateId, (req, res, next) => {
  Projects.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch(next);
});

// METHOD(POST) => /API/PROJECTS
router.post("/", validateBody, (req, res) => {
  Projects.insert(req.body).then((project) => {
    res.status(201).json(project);
  });
});

// METHOD(PUT) => /API/PROJECTS/:ID
router.put("/:id", validateId, validateBody, (req, res) => {
  Projects.update(req.params.id, req.body).then((project) => {
    res.status(200).json(project);
  });
});

// METHOD(DELETE) => /API/PROJECTS/:ID
router.delete("/:id", validateId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(200).json();
    })
    .catch(next);
});

// METHOD(GET) => /API/PROJECTS/:ID/ACTIONS
router.get("/:id/actions", validateId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

// eslint-disable-next-line
router.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Something here",
  });
});

module.exports = router;
