import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: String,
    bio: String,
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread",
        },
    ],
    onboarding: {
        type: Boolean,
        default: true,
    },
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community",
        }
    ],
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ]
});

userSchema.index({ username: 1 });
userSchema.index({ threads: 1 });
userSchema.index({ communities: 1 });
userSchema.index({ courses: 1 });

const populateOptions = [
    { path: "threads", select: "title createdAt" },
    { path: "communities", select: "name" },
    { path: "courses", select: "title" },
];

userSchema.set("toObject", { getters: true });
userSchema.set("toJSON", { getters: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
