import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  playlist: [String],
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
