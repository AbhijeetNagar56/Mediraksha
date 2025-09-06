
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Default user location marker
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Hospital marker
const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -28],
});

export default function MapComponent() {
  const [position, setPosition] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Error getting location:", err);
        }
      );
    }
  }, []);

  // Fetch hospitals using Nominatim
  const fetchHospitals = async () => {
    if (!position) return;
    const [lat, lon] = position;

    // Create bounding box around user location
    const viewbox = `${lon - 0.05},${lat + 0.05},${lon + 0.05},${lat - 0.05}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=hospital&limit=20&viewbox=${viewbox}&bounded=1`;

    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "MediRaksha/1.0", // Required by Nominatim
        },
      });
      const data = await res.json();
      console.log("Hospitals:", data);

      // Normalize hospital data
      const formattedHospitals = data.map((place, index) => ({
        id: place.place_id || index,
        lat: parseFloat(place.lat),
        lon: parseFloat(place.lon),
        name: place.display_name,
      }));

      setHospitals(formattedHospitals);
    } catch (err) {
      console.error("Error fetching hospitals:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-4 text-center mt-0">
        <button
          className="btn btn-primary mb-10"
          onClick={fetchHospitals}
          disabled={!position}
        >
          Show Nearby Hospitals
        </button>
      </div>

      <div>
        {position ? (
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "700px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* User Location */}
            <Marker position={position} icon={customIcon}>
              <Popup>You are here 📍</Popup>
            </Marker>

            {/* Hospitals */}
            {hospitals.map((hospital) => (
              <Marker
                key={hospital.id}
                position={[hospital.lat, hospital.lon]}
                icon={hospitalIcon}
              >
                <Popup>{hospital.name || "Unnamed Hospital"}</Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <p className="text-center">Fetching your location...</p>
        )}
      </div>
      <Footer />
    </>
  );
}
