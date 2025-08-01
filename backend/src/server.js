import express from "express"
import dotenv from "dotenv"
import router from "./routes/auth.js";
import mainRoute from "./routes/dash.js"
import { connectDB } from "./config/db.js";
import authMiddleware from "./middlewares/authMiddleware.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;



app.use(express.json());
app.get('/api', (req, res) => {
    res.status(200).json({ message: "home page" });
});


app.use('/api/auth', router);
app.use('/api/dashboard', authMiddleware, mainRoute);


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port:${port}`);
    });
});