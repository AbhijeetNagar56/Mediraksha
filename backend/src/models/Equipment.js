import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  quantity: { type: Number, default: 1 },
});

export default mongoose.model("Equipment", equipmentSchema);
