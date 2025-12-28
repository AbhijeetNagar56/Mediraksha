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

// import express from "express";
// import dotenv from "dotenv";
// import { connectDB } from "./config/dataBase.js";
// import cors from "cors";
// import authRoutes from "./routes/authRoutes.js";
// import dashBoard from "./routes/dashBoard.js";
// import authMiddleware from "./middlewares/authMiddleware.js";
// import path from "path";
// import { fileURLToPath } from "url";

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// if (process.env.NODE_ENV !== "production") {
//   app.use(
//     cors({
//       origin: "http://localhost:5173",
//       Credentials: true,
//     })
//   );
// } else {
//   app.use(cors());
// }


// app.use(express.json());

// app.get("/api", (_, res) => {
//   res.status(200).json({ msg: "Welcome to MediRaksha" });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/dashBoard", authMiddleware, dashBoard);
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../../frontend/dist")));
//   app.get("/.*/", (_, res) => {
//     res.sendFile(path.join(__dirname, "../../frontend","dist","index.html"));
//   });
// }


// connectDB()
//   .then(() => {
//     console.log("ENV:", process.env.NODE_ENV);
//     console.log("DIR:", __dirname);
//     console.log("MongoDB Connected");
//     app.listen(PORT, () =>
//       console.log("Server running...")
//     );
//   })
//   .catch((error) => console.error(error));
