import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("SahayChain API is alive and running!");
});

export { app };
