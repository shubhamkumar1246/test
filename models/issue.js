// issue schema
import mongoose from "mongoose";
const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    label: [
      {
        type: String,
        required: true,
      },
    ],
    author: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);
const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
