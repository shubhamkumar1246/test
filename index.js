import express from "express";
import expressLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import db from "./config/mongoose.js";
import router from "./routes/index.js";
import { default as connectMongoDBSession } from "connect-mongodb-session";
import http from "http";
import session from "express-session";

//initializing app and port and stting up asset and expressejslayout extracting style and scripts from the child and using /as home router
const app = express();
const port = process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || "0.0.0.0";
const MongoStore = connectMongoDBSession(session);
//making the static folder to use css from it
app.use(express.static("./assets"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//setting up ejs views for the application and extracting scripts and styles from the child ejs
app.set("view engine", "ejs");
app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//make app use index.js file in routes folder
app.use("/", router);

//making app listen to port
app.listen(port, server_host, function (err) {
  if (err) {
    console.log("port connecting error", err);
    return;
  }
  console.log("server is running on port :", port);
});
