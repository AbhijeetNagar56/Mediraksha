import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }, // 🔹 Link to patient
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Report', reportSchema);
