
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dataBase.js"; 
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import dashBoard from "./routes/dashBoard.js";
import authMiddleware from "./middlewares/authMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  url: "http://localhost:5173",
}));

app.use(express.json());


// API Routes
app.get("/api", (_, res) => {
  res.status(200).json({ msg: "Welcome to MediRaksha" });
});

// other routes
app.use("/api/auth", authRoutes);
app.use("/api/dashBoard", authMiddleware, dashBoard);



// Mongo Connection
connectDB().then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.error(error));