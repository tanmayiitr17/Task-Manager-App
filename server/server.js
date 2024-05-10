import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import taskRoute from "./routes/task.js";

const app = express();

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB Connected successfully!");
    })
    .catch((err) => {
        console.log(err);
    });
app.use(cors());

app.use(express.json());
app.get('/', (req, res) => {
    res.send("Backend server is running!");
});


app.use("/auth", authRoute);
app.use("/task", taskRoute);

app.listen(5000, () => {
    console.log("Backend server is running on 5000!");
});

