import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { GridFSBucket } from 'mongodb';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getPatients } from '../controllers/dashController.js';
import { addAvailability, getAvailability, deleteAvailability } from "../controllers/availabilityController.js";
import { addRoom, addEquipment, getResources, checkResourceAvailability } from "../controllers/resourceController.js";
import { createSchedule, getSchedules, deleteSchedule } from '../controllers/scheduleController.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT;

// MongoDB connection
const conn = mongoose.connection;
let bucket;

conn.once('open', () => {
  bucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
});

// ✅ Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
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

// ✅ Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* -------------------------------
   FILE ROUTES
--------------------------------*/

// Upload a file
router.post('/upload', verifyToken, upload.single('report'), async (req, res) => {
  try {
    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      metadata: { userId: req.userId },
    });
    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', (file) => {
      res.status(201).json({ msg: 'File uploaded successfully', file });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Upload failed' });
  }
});

// List user files
router.get('/files', verifyToken, async (req, res) => {
  try {
    const files = await bucket.find({ 'metadata.userId': req.userId }).toArray();
    if (!files.length) return res.status(404).json({ msg: 'No files found' });
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Download file
router.get('/file/:id', verifyToken, async (req, res) => {
  try {
    const file = await bucket
      .find({ _id: new mongoose.Types.ObjectId(req.params.id) })
      .toArray();
    if (!file.length) return res.status(404).json({ msg: 'File not found' });

    // Ownership check
    if (file[0].metadata.userId !== req.userId) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const downloadStream = bucket.openDownloadStream(file[0]._id);
    downloadStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Delete file
router.delete('/file/:id', verifyToken, async (req, res) => {
  try {
    const file = await bucket
      .find({ _id: new mongoose.Types.ObjectId(req.params.id) })
      .toArray();
    if (!file.length) return res.status(404).json({ msg: 'File not found' });

    // Ownership check
    if (file[0].metadata.userId !== req.userId) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    await bucket.delete(new mongoose.Types.ObjectId(req.params.id));
    res.status(200).json({ msg: 'File deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/patients', getPatients);


router.post("/availability", addAvailability);
router.get("/availability", getAvailability);
router.delete("/availability/:id", deleteAvailability);


router.post("/resources/room", addRoom);
router.post("/resources/equipment", addEquipment);
router.get("/resources", getResources);
router.post("/resources/check", checkResourceAvailability);



router.get('/schedule/all', getSchedules);
router.post("/schedule/create", createSchedule);
router.delete("/schedule/delete/:id", deleteSchedule);



export default router;
