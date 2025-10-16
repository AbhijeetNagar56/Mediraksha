import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  capacity: { type: Number, default: 1 },
});

export default mongoose.model("Room", roomSchema);
