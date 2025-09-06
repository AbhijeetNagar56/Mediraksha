import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { connectDB } from '../config/dataBase.js';
import mongoose from 'mongoose';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';

const router = express.Router();
const JWT_SECRET = process.env.JWT;

// MongoDB Connection
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // bucket name
});

// Multer GridFS Storage Setup
const storage = new GridFsStorage({
  url: process.env.MONGO_URI, // your MongoDB connection string
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: 'uploads',
      metadata: { userId: req.user }, // attach userId for filtering
    };
  },
});

const upload = multer({ storage });

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};


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

router.patch('/details', async (req, res) => {
    try {
        const token = req.header('Authorization')?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        // Extract details from request body
        const { gender, age } = req.body;
        if (!gender || !age) {
            return res.status(400).json({ msg: 'Please provide both gender and age' });
        }

        // Update user details
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { gender, age },
            { new: true, runValidators: true, select: "-password" }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({
            msg: 'User details updated successfully',
            user: updatedUser
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.patch('/update', async (req, res) => {
    try {
        const token = req.header('Authorization')?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;

        // Extract details from request body
        const { gender, age, name } = req.body;
        if (!gender || !age) {
            return res.status(400).json({ msg: 'Please provide both gender and age' });
        }

        // Update user details
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {name, gender, age},
            { new: true, runValidators: true, select: "-password" }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({
            msg: 'User details updated successfully',
            user: updatedUser
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});


// ✅ File Upload
router.post('/upload',verifyToken, upload.single('report'), (req, res) => {
  res.status(201).json({ msg: 'File uploaded successfully', file: req.file });
});

// ✅ Get all uploaded files
router.get('/files',verifyToken, async (req, res) => {
  try {
    gfs.files.find({ 'metadata.userId': req.user }).toArray((err, files) => {
      if (!files || files.length === 0) return res.status(404).json({ msg: 'No files found' });
      res.json(files);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Download file by ID
router.get('/file/:id',verifyToken, async (req, res) => {
  try {
    const file = await gfs.files.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
    if (!file) return res.status(404).json({ msg: 'File not found' });

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;