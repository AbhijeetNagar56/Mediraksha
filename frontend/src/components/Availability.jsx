import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Availability = () => {
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slots, setSlots] = useState([]);

  const fetchSlots = async () => {
    try {
      const res = await axiosInstance.get("/api/dashBoard/availability");
      setSlots(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleAdd = async () => {
    if (!day || !startTime || !endTime) return alert("Fill all fields");
    try {
      await axiosInstance.post("/api/dashBoard/availability", { day, startTime, endTime });
      fetchSlots();
      setDay(""); setStartTime(""); setEndTime("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/dashBoard/availability/${id}`);
      fetchSlots();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-2xl mx-auto bg-base-200 rounded-xl shadow-lg my-10">
        <h2 className="text-2xl font-bold mb-4">Set Availability</h2>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <select
            className="select select-bordered"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="">Day</option>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <input
            type="time"
            className="input input-bordered"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            className="input input-bordered"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        
        <button className="btn btn-primary w-full" onClick={handleAdd}>
          Add Slot
        </button>

        <h3 className="text-xl mt-6 font-semibold">Your Availability</h3>
        {slots.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {slots.map((slot) => (
              <li key={slot._id} className="flex justify-between items-center bg-base-100 p-2 rounded">
                <span>{slot.day}: {slot.startTime} - {slot.endTime}</span>
                <button className="btn btn-error btn-sm" onClick={() => handleDelete(slot._id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No slots added yet.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Availability;
