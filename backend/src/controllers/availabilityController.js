import Availability from "../models/Availability.js";

// Add availability slot
export const addAvailability = async (req, res) => {
  try {
    const { day, startTime, endTime } = req.body;
    const practitioner = req.user.id; // Practitioner from auth token

    const slot = new Availability({ practitioner, day, startTime, endTime });
    await slot.save();

    res.json({ msg: "Availability added", slot });
  } catch (err) {
    res.status(500).json({ msg: "Error adding availability", error: err.message });
  }
};

// Get all availability for a practitioner
export const getAvailability = async (req, res) => {
  try {
    const practitioner = req.user.id;
    const slots = await Availability.find({ practitioner });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching availability" });
  }
};

// Delete availability slot
export const deleteAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    await Availability.findByIdAndDelete(id);
    res.json({ msg: "Availability deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting availability" });
  }
};
