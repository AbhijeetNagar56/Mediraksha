import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js";
import dashBoard from "./routes/dashBoard.js"
import { connectDB } from "./config/dataBase.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import User from "./models/User.js";
import multer from 'multer'
import path from 'path'


dotenv.config();
const app = express();
const port = process.env.PORT;


// middlewares
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

// File storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// File upload route
app.post('/upload', upload.single('report'), (req, res) => {
  res.json({ message: 'File uploaded successfully', file: req.file });
});


app.use(express.json());
app.get('/api', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json( users );
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg:"no users"});
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/dashBoard', authMiddleware, dashBoard);



connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
});