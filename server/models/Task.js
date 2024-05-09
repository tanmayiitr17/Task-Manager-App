import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        title: { type: String, required: true },
        dueDate: { type: String, required: true },
        priority: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true }, 
        status: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
