import Room from "../models/Room.js";
import Equipment from "../models/Equipment.js";
import Session from "../models/Session.js";

// Add a new room
export const addRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.json({ msg: "Room added", room });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Add new equipment
export const addEquipment = async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    await equipment.save();
    res.json({ msg: "Equipment added", equipment });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all resources
export const getResources = async (req, res) => {
  try {
    const rooms = await Room.find();
    const equipment = await Equipment.find();
    res.json({ rooms, equipment });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Check availability
export const checkResourceAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;

    const sessions = await Session.find({
      date,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ],
    }).populate("room equipment");

    res.json({ bookedResources: sessions });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
