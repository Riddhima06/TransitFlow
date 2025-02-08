import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const cities = [
  "Mumbai", "Delhi", "Kolkata", "Chennai", "Bangalore", 
  "Hyderabad", "Ahmedabad", "Pune", "Surat", "Kanpur"
];

const busTypes = ["Seater", "Sleeper", "AC", "NonAC"];
const amenities = ["Water Bottle", "Blankets", "Charging Point", "Toilet", "Bed Sheet"];

const busData = cities.flatMap((fromCity) =>
    
  cities
    .filter((toCity) => toCity !== fromCity)
    .slice(0, 2) 
    .map((toCity, index) => ({
      id: `${fromCity}-${toCity}-${index}`,
      from: fromCity,
      to: toCity,
      departure: `${6 + index * 3}:00`,
      arrival: `${12 + index * 3}:00`,
      duration: "6h",
      fare: 1000 + index * 500,
      rating: (3.5 + index * 0.5).toFixed(1),
      seatsAvailable: 20 - index * 5,
      type: busTypes[index % busTypes.length],
      amenities: amenities.filter((_, i) => i % (index + 1) !== 0)
    }))
);

const BusBooking = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  const [selectedBusType, setSelectedBusType] = useState("");
  const [selectedAmenity, setSelectedAmenity] = useState("");
  const navigate = useNavigate();

  const filteredBuses = busData.filter(bus => 
    (!selectedFrom || bus.from === selectedFrom) &&
    (!selectedTo || bus.to === selectedTo) &&
    (!selectedBusType || bus.type === selectedBusType) &&
    (!selectedAmenity || bus.amenities.includes(selectedAmenity))
  );

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>Book Tickets</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", alignItems: "center", padding: "20px", borderRadius: "10px", boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.1)" }}>
        <select style={{ padding: "12px", fontSize: "16px", borderRadius: "5px" }} onChange={(e) => setSelectedFrom(e.target.value)}>
          <option value="">From</option>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
        <span style={{ fontSize: "20px" }}>➡</span>
        <select style={{ padding: "12px", fontSize: "16px", borderRadius: "5px" }} onChange={(e) => setSelectedTo(e.target.value)}>
          <option value="">To</option>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
        <select style={{ padding: "12px", fontSize: "16px", borderRadius: "5px" }} onChange={(e) => setSelectedBusType(e.target.value)}>
          <option value="">Bus Type</option>
          {busTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
        <select style={{ padding: "12px", fontSize: "16px", borderRadius: "5px" }} onChange={(e) => setSelectedAmenity(e.target.value)}>
          <option value="">Amenities</option>
          {amenities.map(amenity => <option key={amenity} value={amenity}>{amenity}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "20px" }}>
        {filteredBuses.length > 0 ? filteredBuses.map((bus) => (
          <div key={bus.id} style={{ padding: "16px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.1)" }}>
            <h3 style={{ fontWeight: "600" }}>{bus.from} → {bus.to}</h3>
            <p>Departure: {bus.departure} | Arrival: {bus.arrival}</p>
            <p>Duration: {bus.duration}</p>
            <p style={{ color: "green", fontWeight: "bold" }}>INR {bus.fare}</p>
            <p>Type: {bus.type}</p>
            <p>Amenities: {bus.amenities.join(", ")}</p>
            <p style={{ fontSize: "14px", color: "gray" }}>Seats Available: {bus.seatsAvailable}</p>
            <button 
              style={{ marginTop: "10px", width: "100%", padding: "10px", backgroundColor: "red", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px" }}
              onClick={() => navigate(`/view-seats/${bus.id}`)}
            >
              View Seats
            </button>
          </div>
        )) : <p style={{ color: "red", fontWeight: "bold", marginTop: "20px", fontSize: "18px" }}>No buses available</p>}
      </div>
      {selectedRoute && <p style={{ marginTop: "20px", color: "green", fontSize: "18px" }}>Selected Bus: {selectedRoute}</p>}
    </div>
  );
};

export default BusBooking;
