import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import dashBoard from "./routes/dashBoard.js";
import { connectDB } from "./config/dataBase.js";
import authMiddleware from "./middlewares/authMiddleware.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

// MongoDB connection
await connectDB();


// Test route
app.get("/api", async (req, res) => {
  res.status(200).send({ msg:"welcome to mediraksha"});
});

// Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashBoard", authMiddleware, dashBoard);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
