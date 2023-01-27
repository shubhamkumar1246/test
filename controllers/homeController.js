// home controller which is fetching all the projects from the database on loading and rendering into the home page
import Project from "../models/project.js";

const home = async function (req, res) {
  Project.find({}, function (err, project) {
    if (err) {
      console.log("error in fetching projects", err);
      return;
    }
    return res.render("home", {
      title: "issue-tracker | Home",
      project_list: project,
    });
  });
};
export { home };
