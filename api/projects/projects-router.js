// Write your "projects" router here!
const Projects = require("../projects/projects-model");

// METHOD(GET) => /API/PROJECTS
exports.getProjects = async (req, res, next) => {
  const projects = await Projects.find();

  res.status(200).json({
    success: true,
    results: projects.length,
    data: projects,
  });
};

// METHOD(GET) => /API/PROJECTS/:ID

// METHOD(POST) => /API/PROJECTS

// METHOD(PUT) => /API/PROJECTS/:ID

// METHOD(DELETE) => /API/PROJECTS/:ID

// METHOD(GET) => /API/PROJECTS/:ID/ACTIONS
