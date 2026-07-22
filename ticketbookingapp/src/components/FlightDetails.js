import React from 'react';

const FLIGHTS = [
  { id: '1', flightNo: 'AI-101', origin: 'New York (JFK)', destination: 'London (LHR)', departure: '08:00 AM', price: '$450' },
  { id: '2', flightNo: 'BA-202', origin: 'London (LHR)', destination: 'Tokyo (HND)', departure: '11:30 AM', price: '$850' },
  { id: '3', flightNo: 'LH-303', origin: 'Frankfurt (FRA)', destination: 'Singapore (SIN)', departure: '03:15 PM', price: '$920' },
  { id: '4', flightNo: 'EK-404', origin: 'Dubai (DXB)', destination: 'Paris (CDG)', departure: '06:45 PM', price: '$600' },
  { id: '5', flightNo: 'SQ-505', origin: 'Singapore (SIN)', destination: 'Sydney (SYD)', departure: '10:00 PM', price: '$720' }
];

function FlightDetails({ isLoggedIn, onSelectFlight }) {
  return (
    <div className="flight-container">
      <h2 className="section-title">Available Flights</h2>
      <p className="section-subtitle">
        {isLoggedIn 
          ? "Select a flight to book your tickets." 
          : "Browse our schedule. Login to book tickets."}
      </p>
      
      <div className="table-responsive">
        <table className="flight-table">
          <thead>
            <tr>
              <th>Flight No</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Departure</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {FLIGHTS.map((flight) => (
              <tr key={flight.id}>
                <td className="flight-no">{flight.flightNo}</td>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>{flight.departure}</td>
                <td className="flight-price">{flight.price}</td>
                <td>
                  {isLoggedIn ? (
                    <button 
                      className="book-action-btn"
                      onClick={() => onSelectFlight(flight)}
                    >
                      Book Now
                    </button>
                  ) : (
                    <span className="restricted-badge">Login required to book</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FlightDetails;
export { FLIGHTS };
