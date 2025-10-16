import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axiosInstance from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Scheduling = () => {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [title, setTitle] = useState("");
    const [duration, setDuration] = useState(30); // minutes

    // Fetch schedules
    const fetchSchedules = async () => {
        try {
            const res = await axiosInstance.get("/dashBoard/schedule/all");
            setEvents(
                res.data.map((item) => ({
                    id: item._id,
                    title: item.title,
                    start: item.start,
                    end: item.end,
                }))
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    // Create schedule
    const handleCreate = async () => {
        if (!title || !selectedDate) return alert("Enter title & select date!");

        try {
            await axiosInstance.post("/dashBoard/schedule/create", {
                title,
                start: selectedDate,
                duration,
            });
            setTitle("");
            setSelectedDate(null);
            fetchSchedules();
        } catch (error) {
            console.error(error);
        }
    };

    // Delete schedule
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/dashBoard/schedule/delete/${id}`);
            fetchSchedules();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Appointment Scheduling</h1>
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Session title"
                        className="input input-bordered"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <select
                        className="select select-bordered"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                    >
                        <option value={30}>30 min</option>
                        <option value={60}>60 min</option>
                        <option value={90}>90 min</option>
                    </select>
                    <button className="btn btn-primary" onClick={handleCreate}>
                        Add
                    </button>
                </div>

                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    selectable={true}
                    events={events}
                    dateClick={(info) => setSelectedDate(info.dateStr)}
                    eventClick={(info) => handleDelete(info.event.id)}
                />
            </div>
            <Footer />  
        </>
    );
};

export default Scheduling;
