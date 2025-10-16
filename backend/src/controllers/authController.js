
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
const JWT_SECRET = process.env.JWT;


// sign up
export async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: 'User already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.log("Error in the app ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}


// sign in
export async function getUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "user not found" });
        const passCorrect = await bcrypt.compare(password, user.password);
        if (!passCorrect) return res.status(400).json({ msg: 'password not correct' });
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2d' });
        res.json({token});
    } catch (error) {
        console.log("Error in the app ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out" });
};


