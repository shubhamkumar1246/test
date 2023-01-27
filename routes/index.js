// entry point to routers
import express from "express";
import createProject from "./project.js";
import { home } from "../controllers/homeController.js";

const router = express.Router();
//post request to home page
router.get("/", home);
//using all the project based routes
router.use("/project", createProject);

export default router;
