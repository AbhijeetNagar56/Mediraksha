
import model from '../models/login.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
const JWT_SECRET = "abcdefgh";



// sign up
export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        const userExists = await model.findOne({ username });
        if (userExists) return res.status(400).json({ msg: 'User already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new model({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.log("Error in the app ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}


// sign in
export async function getUser(req, res) {
    try {
        const {username, password} = req.body;
        const user = await model.findOne({username});
        if(!user) return res.status(404).json({message:"user not found"});
        const passCorrect = await bcrypt.compare(password, user.password);
        if(!passCorrect) return res.status(400).json({msg:'password not correct'});
        const token = jwt.sign({id:user._id}, JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    } catch (error) {
        console.log("Error in the app ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}





// pass updation
export async function updatePassword(req, res) {
    try {
        const { name, pass } = req.body;
        res.status(200).json({ message: `${name} your pass has been updated` });
    } catch (error) {
        console.log("Error in the app ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}


// bio update
export async function updateBio(req, res) {
    try {
        const { name, pass } = req.body;
        res.status(200).json({ message: `${name} your pass has been updated` });
    } catch (error) {
        console.log("Error in the app ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}



// account deletion
export async function deleteUser(req, res) {
    try {
        res.status(200).json({ message: "deleted successfully" });
    } catch (error) {
        console.log("Error in the app ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}