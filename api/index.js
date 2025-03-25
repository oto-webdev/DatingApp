import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDb from "./lib/connectDb.js";

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import matchRoute from "./routes/matchRoute.js";
import messageRoute from "./routes/messageRoute.js";

config();

const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/matches", matchRoute)
app.use("/api/messages", messageRoute)

const startServer = async () => {
    await connectDb();
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    })
}

startServer();