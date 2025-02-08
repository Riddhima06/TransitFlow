import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Bus from '../assets/bus.jpeg';

const cities = [
  "Mumbai", "Delhi", "Kolkata", "Chennai", "Bangalore",
  "Hyderabad", "Ahmedabad", "Pune", "Surat", "Kanpur"
];

const Home = () => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");

  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <img src={Bus} alt="TransitFlow Logo" className="logo" />
            <h1>TransitFlow</h1>
          </div>
          <div className="navbar-right">
            <a href="#">Help</a>
            <a href="#">English</a>
            <a href="#">Account</a>
          </div>
        </div>
      </header>

      <main className="hero-section">
        <h2>India's No. 1 Online Ticket Booking Site</h2>

        <div className="search-container">
          <div className="search-item">
            <label htmlFor="from">From</label>
            <div className="input-wrapper">
              <span className="icon">🚌</span>
              <select id="from" value={fromCity} onChange={(e) => setFromCity(e.target.value)}>
                <option value="">Select Source</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="search-item">
            <label htmlFor="to">To</label>
            <div className="input-wrapper">
              <span className="icon">📍</span>
              <select id="to" value={toCity} onChange={(e) => setToCity(e.target.value)} disabled={!fromCity}>
                <option value="">Select Destination</option>
                {cities.filter(city => city !== fromCity).map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="search-item">
            <label htmlFor="date">Date</label>
            <div className="input-wrapper">
              <span className="icon">📅</span>
              <input type="date" id="date" />
            </div>
          </div>

          <button className="search-button" disabled={!fromCity || !toCity}>
            Search Buses
          </button>
        </div>

        <button className="book-button" onClick={() => navigate('/busbook')}>Book Ticket</button>
      </main>

      <footer className="footer">
        <p>Apno ko, Sapno ko Kareeb Laaye.</p>
      </footer>
    </div>
  );
};

export default Home;
