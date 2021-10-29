// add middlewares here related to actions
const actions = require("./actions-model");

function validateId(req, res, next) {
  const { id } = req.params;
  actions
    .get(id)
    .then((possibleProject) => {
      if (possibleProject) {
        req.user = possibleProject;
        next();
      } else {
        next({ message: "not found", status: 404 });
      }
    })
    .catch(next);
}

function validateBody(req, res, next) {
  if (!req.body.notes || !req.body.description || !req.body.project_id) {
    next({ status: 400, message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = { validateId, validateBody };
