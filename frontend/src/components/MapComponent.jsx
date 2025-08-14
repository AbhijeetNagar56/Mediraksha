
// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'



// const customIcon = new L.Icon({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// export default function MyMap() {
//   const [position, setPosition] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setPosition([pos.coords.latitude, pos.coords.longitude]);
//         },
//         (err) => {
//           console.error("Error getting location:", err);
//         }
//       );
//     }
//   }, []);

//   return (
//     <>
//     <Navbar />
//     <div className="mt-50">
//       {position ? (
//         <MapContainer
//           center={position}
//           zoom={14}
//           style={{ height: "500px", width: "100%" }}
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker position={position} icon={customIcon}>
//             <Popup>You are here 📍</Popup>
//           </Marker>
//         </MapContainer>
//       ) : (
//         <p className="text-center">Fetching your location...</p>
//       )}
//     </div>
//     <Footer />
//     </>
//   );
// }


import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const customIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -28],
});

export default function MyMap() {
  const [position, setPosition] = useState(null);
  const [hospitals, setHospitals] = useState([]);

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
  const fetchHospitals = async () => {
    if (!position) return;
    const [lat, lon] = position;

    const query = `
    [out:json];
    node["amenity"="hospital"](around:5000,${lat},${lon});
    out;
  `;

    try {
      const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `data=${encodeURIComponent(query)}`,
      });

      const data = await res.json();
      console.log(data); // debug
      setHospitals(data.elements || []);
    } catch (err) {
      console.error("Error fetching hospitals:", err);
    }
  };


  return (
    <>
      <Navbar />
      <div className="p-4 text-center mt-50">
        <button
          className="btn btn-primary mb-4"
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
            zoom={14}
            style={{ height: "500px", width: "100%" }}
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
                <Popup>
                  {hospital.tags.name || "Unnamed Hospital"}
                </Popup>
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
