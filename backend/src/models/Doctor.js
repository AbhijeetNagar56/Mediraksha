import mongoose from 'mongoose'

const schema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        doctorId: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
);

const doctor = mongoose.model('doctor', schema);
export default doctor;