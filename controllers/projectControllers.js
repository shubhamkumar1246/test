// importing both the database schema
import { ObjectId } from "mongodb";
import Project from "../models/project.js";
import Issue from "../models/issue.js";
// exporting project coltroller class having all the functionality we need
export default class ProjectController {
  //this will render the create project form page
  static form = async (req, res) => {
    return res.render("createProject", {
      title: "issue-tracker | createProject",
    });
  };
  // creating new project on the basis of field entered in the create project page and storing all the data in lowerCase
  static create = (req, res) => {
    Project.create(
      {
        name: req.body.name.toLowerCase(),
        description: req.body.description.toLowerCase(),
        author: req.body.author.toLowerCase(),
      },
      (error, newProject) => {
        if (error) {
          console.log("creating project error", error);
          return;
        }
        return res.redirect("/");
      }
    );
  };

  //rendering the issue list page by clicking on particular project
  static details = async function (req, res) {
    try {
      let project = await Project.findById(req.params.projectId);
      if (project) {
        let issue = await project.populate("issue");
        return res.render("projectDetail", {
          title: "issue-tracker | Project Detail",
          projectId: project,
          project_details: project.issue,
        });
      }
    } catch (error) {
      console.log("fething error in project detail page", error);
    }
  };

  //create issue page will be rendered when we click new issue button on project detail page
  static issueForm = async function (req, res) {
    return res.render("createIssue", {
      title: "issue-tracker | createIssue",
      id: req.params.projectId,
    });
  };

  //creating isssue on the basis of fields entered and then adding the issue in project collection in lower case
  static createIssue = async function (req, res) {
    try {
      let project = await Project.findById(ObjectId(req.body.project));
      if (project) {
        let labels = req.body.labels.toLowerCase().split(",");
        let issue = await Issue.create({
          title: req.body.title.toLowerCase(),
          description: req.body.description.toLowerCase(),
          author: req.body.author.toLowerCase(),
          project: req.body.project,
          label: labels,
        });

        project.issue.push(issue);

        project.save();

        let updatedIssue = await project.populate("issue");
        return res.render("projectDetail", {
          title: "issue-tracker | Project Detail",
          projectId: project,
          project_details: project.issue,
        });
      }
    } catch (err) {
      console.log("error in create issue controller ", err);
      return;
    }
  };

  //filtering logic in db using if else based on selected option and search field entered so if the description and title have that patter we used regex search and for author name should be exact and for lables if the labels are in entered search we return all those issues
  static find = async (req, res) => {
    try {
      let id = req.params.id;
      let option = req.body.option;
      let issue;
      var S = req.body.searchField.toLowerCase();
      let project = await Project.findById(ObjectId(req.params.id));
      if (option === "author") {
        issue = await Issue.find({
          project: ObjectId(id),
          author: S,
        }).populate();
      } else if (option === "title") {
        issue = await Issue.find({
          project: ObjectId(id),
          title: { $regex: S },
        }).populate();
      } else if (option === "description") {
        issue = await Issue.find({
          project: ObjectId(id),
          description: { $regex: S },
        }).populate();
      } else {
        let labels = S.split(",");
        console.log(labels);
        issue = await Issue.find({
          project: ObjectId(id),
          label: { $in: labels },
        }).populate();
      }
      console.log(issue);
      return res.render("projectDetail", {
        title: "issue-tracker | Project Detail",
        projectId: project,
        project_details: issue,
      });
    } catch (error) {
      console.log("fething error in project detail page", error);
    }
  };
}
