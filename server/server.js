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
// app.use(cors({
//   origin: [
//     // "http://localhost:5173",
//     // "http://localhost:5175",
//     // "https://ecommerce-mern-admin.vercel.app",
//     "https://ecommerce-mern-client-17.vercel.app"
//   ],
//   methods: ["GET", "PUT", "POST", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"] // Add headers needed for your requests
// }));


app.use(express.json());
app.get('/', (req, res) => {
    res.send("Backend server is running!");
});


app.use("/auth", authRoute);
app.use("/task", taskRoute);

app.listen(5000, () => {
    console.log("Backend server is running on 5000!");
});

