import React, { useEffect, useState, useMemo } from "react";
import Navbar from './Navbar'
import Footer from './Footer'

// --- DUMMY DATA WITH HOSPITAL CONTEXT ---

const DUMMY_HOSPITALS = [
  { _id: "H1", name: "Mayo Clinic - Rochester" },
  { _id: "H2", name: "Cleveland Clinic - Main Campus" },
  { _id: "H3", name: "General Community Hospital" },
];

const DUMMY_ROOMS = [
  // Mayo Clinic (H1) Rooms
  { _id: "R101", name: "ICU Ward 1", capacity: 5, hospitalId: "H1" },
  { _id: "R102", name: "General Ward A", capacity: 10, hospitalId: "H1" },
  
  // Cleveland Clinic (H2) Rooms
  { _id: "R201", name: "Isolation Room", capacity: 2, hospitalId: "H2" },
  { _id: "R202", name: "Cardiac Unit B", capacity: 8, hospitalId: "H2" },
];

const DUMMY_EQUIPMENT = [
  // Equipment/Beds available at Mayo Clinic (H1)
  { _id: "B1", name: "Standard Bed", quantity: 15, hospitalId: "H1" },
  { _id: "B2", name: "ICU Ventilator Bed", quantity: 5, hospitalId: "H1" },
  
  // Equipment/Beds available at Cleveland Clinic (H2)
  { _id: "B1", name: "Standard Bed", quantity: 8, hospitalId: "H2" }, // Note: Same type ID, different quantity/hospital
  { _id: "B3", name: "Pediatric Bed", quantity: 3, hospitalId: "H2" },
];

const DUMMY_BOOKINGS = [
  // Booking 1: Mayo Clinic - R102 (General Ward A)
  { 
    _id: "T001", 
    room: DUMMY_ROOMS.find(r => r._id === "R102"), 
    equipment: [
      DUMMY_EQUIPMENT.find(e => e.hospitalId === "H1" && e._id === "B1"), // Standard Bed H1
      DUMMY_EQUIPMENT.find(e => e.hospitalId === "H1" && e._id === "B1"), // Another Standard Bed H1
    ],
    date: "2025-10-10", startTime: "08:00", endTime: "12:00"
  },
  // Booking 2: Cleveland Clinic - R201 (Isolation Room)
  { 
    _id: "T002", 
    room: DUMMY_ROOMS.find(r => r._id === "R201"), 
    equipment: [
      DUMMY_EQUIPMENT.find(e => e.hospitalId === "H2" && e._id === "B3"), // Pediatric Bed H2
    ],
    date: "2025-10-10", startTime: "10:00", endTime: "14:00"
  },
];



const ResourceAllocation = () => {
  const [hospitals, setHospitals] = useState([]);
  const [equipment, setEquipment] = useState([]); 
  const [selectedHospital, setSelectedHospital] = useState("H1"); // Default to Mayo Clinic
  
  // Remaining state for time/bookings
  const [date, setDate] = useState("2025-10-10"); 
  const [startTime, setStartTime] = useState("09:00"); 
  const [endTime, setEndTime] = useState("13:00"); 
  const [bookedResources, setBookedResources] = useState([]);
  const [showAvailability, setShowAvailability] = useState(false); 

  useEffect(() => {
    // MOCK: Load dummy data
    setHospitals(DUMMY_HOSPITALS);
    setEquipment(DUMMY_EQUIPMENT);
  }, []);

  // MOCK: Check availability by loading dummy bookings
  const checkAvailability = () => {
    if (!date || !startTime || !endTime) {
        alert("Please select a Date, Start Time, and End Time.");
        return;
    }
    
    // In a real app, this would be an API call filtered by date/time.
    setBookedResources(DUMMY_BOOKINGS); 
    setShowAvailability(true);
  };

  
  // --- Filter Data by Selected Hospital ---

  // 1. Filter equipment (beds) based on the selected hospital
  const hospitalEquipment = useMemo(() => {
    return equipment.filter(eq => eq.hospitalId === selectedHospital);
  }, [equipment, selectedHospital]);


  // 2. Filter booked equipment based on the selected hospital's rooms
  const bookedBedIdsForPeriod = useMemo(() => {
    if (!showAvailability || !selectedHospital) return [];

    // Filter bookings where the room belongs to the selected hospital
    const filteredBookings = bookedResources.filter(res => 
        res.room?.hospitalId === selectedHospital
    ); 

    // Map down to a list of ALL booked equipment IDs for the selected hospital
    // We use the full equipment object from the booking to match the quantity
    const bookedIds = filteredBookings.flatMap(res => res.equipment.map(eq => eq._id)); 

    return bookedIds;
  }, [bookedResources, selectedHospital, showAvailability]);


  // 3. Calculate total and available quantities for each bed type in the selected hospital
  const bedAvailabilitySummary = useMemo(() => {
    if (!showAvailability) return [];

    const summary = hospitalEquipment.reduce((acc, bed) => {
        const id = bed._id;
        const totalQty = bed.quantity;
        
        // Use a composite key if equipment IDs aren't unique across hospitals, 
        // but since we filtered hospitalEquipment already, ID is enough here.

        if (!acc[id]) {
            acc[id] = { 
                id, 
                name: bed.name, 
                totalQty, 
                bookedQty: 0, 
                availableQty: 0 
            };
        }

        // Count how many times this specific equipment type ID appears in the booked list for this hospital
        const bookedCount = bookedBedIdsForPeriod.filter(bid => bid === id).length;
        acc[id].bookedQty = bookedCount;

        // Calculate available quantity
        acc[id].availableQty = Math.max(0, acc[id].totalQty - acc[id].bookedQty);

        return acc;
    }, {});

    return Object.values(summary).sort((a, b) => a.name.localeCompare(b.name));
  }, [hospitalEquipment, bookedBedIdsForPeriod, showAvailability]);
  
  
  const handleHospitalChange = (e) => {
    setSelectedHospital(e.target.value);
    setShowAvailability(false); // Reset availability view
    setBookedResources([]); // Clear old booked resources
  }


  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto bg-base-100 my-10 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Hospital Bed Availability Dashboard</h2>
        
        {/* Hospital Filter */}
        <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Select Hospital</h3>
            <select
                className="select select-bordered select-lg w-full bg-white border-blue-300"
                value={selectedHospital}
                onChange={handleHospitalChange}
            >
                {hospitals.map((hospital) => (
                    <option key={hospital._id} value={hospital._id}>
                        {hospital.name}
                    </option>
                ))}
            </select>
        </div>

        {/* Date and Time Selection */}
        <div className="grid grid-cols-4 gap-4 mb-8 items-end p-4 border rounded-lg bg-gray-50 shadow-inner">
          <div className="col-span-1">
            <label className="label"><span className="label-text font-semibold">Date</span></label>
            <input
                type="date"
                className="input input-bordered w-full bg-white"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label className="label"><span className="label-text font-semibold">Start Time</span></label>
            <input
                type="time"
                className="input input-bordered w-full bg-white"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label className="label"><span className="label-text font-semibold">End Time</span></label>
            <input
                type="time"
                className="input input-bordered w-full bg-white"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <button className="btn btn-info col-span-1 h-full font-bold text-white" onClick={checkAvailability}>
            Check Bed Availability
          </button>
        </div>

        {/* --- Display Available Beds in a Table --- */}
        {showAvailability ? (
          <div className="mt-6 p-4 border border-blue-200 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-3 text-gray-700">
                Current Availability for {hospitals.find(h => h._id === selectedHospital)?.name}
            </h4>
            
            <div className="overflow-x-auto">
                <table className="table w-full table-zebra">
                    <thead>
                        <tr className="bg-blue-100 text-blue-800 font-extrabold">
                            <th>Bed/Equipment Type</th>
                            <th className="text-center">Total Inventory</th>
                            <th className="text-center">Booked for Period</th>
                            <th className="text-center">Available Beds</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bedAvailabilitySummary.length > 0 ? (
                            bedAvailabilitySummary.map((bed) => (
                                <tr key={bed.id} className={bed.availableQty === 0 ? 'bg-red-50 text-error font-semibold' : ''}>
                                    <td>
                                        <div className="font-bold">{bed.name}</div>
                                    </td>
                                    <td className="text-center">{bed.totalQty}</td>
                                    <td className="text-center">{bed.bookedQty}</td>
                                    <td className="text-center">
                                        <span className={`badge badge-lg shadow-sm ${bed.availableQty > 0 ? 'badge-success text-white' : 'badge-error text-white'}`}>
                                            {bed.availableQty}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-500 py-4">
                                    No equipment found for this hospital.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
          </div>
        ) : (
            <div className="p-8 text-center text-gray-500 border-2 border-dashed rounded-lg">
                Please select a date and time and click "Check Bed Availability" to view real-time inventory for the selected hospital.
            </div>
        )}
        {/* --- End Table Display --- */}

      </div>
      <Footer />
    </>
  );
};

export default ResourceAllocation;
