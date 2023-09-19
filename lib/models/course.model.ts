import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    authorCourse: {
        type: String,
        required: true,
    },
    typeCourse: {
        type: String,
        required: true,
    },
    linkUrl: {
        type: String,
        required: true,
    },
    // imageCourse: String,
    description: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
