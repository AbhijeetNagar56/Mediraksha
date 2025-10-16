import Schedule from "../models/Schedule.js";


// ✅ Create a new schedule with duration support
export const createSchedule = async (req, res) => {
  try {
    const { title, start, duration } = req.body;
    if (!title || !start || !duration) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const startDate = new Date(start);
    const endDate = new Date(startDate.getTime() + duration * 60000); // duration in ms

    const schedule = new Schedule({
      title,
      start: startDate,
      end: endDate,
      user: req.user.id,
    });

    await schedule.save();
    res.status(201).json(schedule);
  } catch (err) {
    res.status(500).json({ msg: "Error creating schedule", error: err.message });
  }
};

// ✅ Get all schedules for logged-in user
export const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find({ user: req.user.id });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching schedules", error: err.message });
  }
};


// ✅ Delete a schedule
export const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) return res.status(404).json({ msg: "Schedule not found" });

    if (schedule.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await schedule.deleteOne();
    res.json({ msg: "Schedule deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting schedule", error: err.message });
  }
};
