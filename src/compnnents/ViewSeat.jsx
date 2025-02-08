import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewSeat.css"; 

const seatLayout = {
  lowerDeck: [
    ["U", "U", "A", "A", "A"],
    ["U", "A", "A", "A", "A"]
  ],
  upperDeck: [
    ["A", "A", "A", "A", "A"],
    ["U", "A", "A", "A", "A"]
  ]
};

const ViewSeats = () => {
  const { busId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Handle seat selection
  const toggleSeatSelection = (row, col, deck) => {
    const seatKey = `${deck}-${row}-${col}`;
    setSelectedSeats((prev) =>
      prev.includes(seatKey)
        ? prev.filter((seat) => seat !== seatKey)
        : [...prev, seatKey]
    );
  };

  const renderSeats = (deckName, seats) => (
    <div className="deck">
      <h3>{deckName}</h3>
      <div className="seat-grid">
        {seats.map((row, rowIndex) =>
          row.map((seat, colIndex) => {
            const seatKey = `${deckName}-${rowIndex}-${colIndex}`;
            const isSelected = selectedSeats.includes(seatKey);
            return (
              <div
                key={seatKey}
                className={`seat ${seat === "U" ? "unavailable" : isSelected ? "selected" : ""}`}
                onClick={() => seat !== "U" && toggleSeatSelection(rowIndex, colIndex, deckName)}
              >
                {seat === "U" ? "X" : "O"}
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <div className="view-seats-container">
      <h2>Bus Seats for Bus ID: {busId}</h2>
      <p>Click on an Available seat to proceed with your transaction.</p>

      {renderSeats("Lower Deck", seatLayout.lowerDeck)}
      {renderSeats("Upper Deck", seatLayout.upperDeck)}

      <div className="legend">
        <div><span className="seat available"></span> Available</div>
        <div><span className="seat unavailable"></span> Unavailable</div>
        <div><span className="seat selected"></span> Selected</div>
      </div>
    </div>
  );
};

export default ViewSeats;
