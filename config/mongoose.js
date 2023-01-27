// setting up mongoose schema for the database Atlas Version
import mongoose from "mongoose";
var uri =
  process.env.MONGOLAB_URI ||
  "mongodb://localhost/issuetracker";
const db = mongoose
  .connect(uri, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log("no connection", err));

export default db;
