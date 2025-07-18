import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import router from "./routes/registration.js";
import mainRoute from "./routes/user.js"
import { connectDB } from "./config/dataBase.js";



dotenv.config();
const app = express();
const port = process.env.PORT || 3000;



app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).json({ message: "home page" });
});


app.use('/user', router);
app.use('/home', mainRoute);


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});