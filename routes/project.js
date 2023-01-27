// defining all the routes of the project page
import express from "express";
import ProjectController from "../controllers/projectControllers.js";

const projectRouter = express.Router();
//get request to get the create project form page
projectRouter.get("/form", ProjectController.form);
//post request to create the project in the database
projectRouter.post("/create", ProjectController.create);
//get request to get the details related to the clicked project
projectRouter.get("/:projectId", ProjectController.details);
//get request to get the create issue form page
projectRouter.get("/issue/:projectId", ProjectController.issueForm);
//post request to create the issue in the database
projectRouter.post("/create-issue", ProjectController.createIssue);
//post request to find the issue in the database
projectRouter.post("/find/:id", ProjectController.find);
export default projectRouter;
