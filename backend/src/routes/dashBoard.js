import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT;

router.get('/', async (req, res) => {
    try {
        const token = req.header('Authorization')?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        // Find user by ID
        const myDet = await User.findById(userId).select("-password"); // exclude password
        if (!myDet) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json(myDet);

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

export default router;
