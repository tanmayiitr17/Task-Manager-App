import express from "express";
import {
    verifyToken,
    verifyTokenAndAuthorization,
} from "../middleware/verifyToken.js";
import Task from "../models/Task.js";

const router = express.Router();

//CREATE TASK
router.post("/", verifyToken, async (req, res) => {
    const newTask = new Task(req.body);
    try {
        const savedTask = await newTask.save();
        res.status(200).json(savedTask);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE TASK

router.put("/:id", verifyToken, async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE TASK

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json("Task has been deleted..");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET TASK

router.get("/find/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL TASKS
router.get("/:id", verifyToken, async (req, res) => {
    const userId = req.params.id;
    try {
        const tasks = await Task.find({ userId });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json(err);
    }
});


export default router;
