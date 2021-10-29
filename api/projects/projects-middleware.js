// add middlewares here related to projects
const Projects = require("./projects-model");

function validateId(req, res, next) {
  const { id } = req.params;
  Projects.get(id)
    .then((possibleProject) => {
      if (possibleProject) {
        req.user = possibleProject;
        next();
      } else {
        next({
          success: false,
          message: "not found",
          status: 404,
        });
      }
    })
    .catch(next);
}

function validateBody(req, res, next) {
  if (!req.body.name || !req.body.description || req.body.completed === null) {
    next({
      success: false,
      message: "missing required text field",
    });
  } else {
    next();
  }
}

module.exports = { validateId, validateBody };
