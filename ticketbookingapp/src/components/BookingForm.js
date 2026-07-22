import React, { useState } from 'react';

function BookingForm({ isLoggedIn, selectedFlight, flights, onBookingSuccess }) {
  const [passengerName, setPassengerName] = useState('');
  const [flightId, setFlightId] = useState(selectedFlight ? selectedFlight.id : '');
  const [ticketsCount, setTicketsCount] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Update selected flight if changed from parent
  React.useEffect(() => {
    if (selectedFlight) {
      setFlightId(selectedFlight.id);
    }
  }, [selectedFlight]);

  // Demonstrate preventing rendering:
  // If the user is not logged in, we return null to prevent this component from rendering.
  if (!isLoggedIn) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passengerName.trim() || !flightId) {
      alert('Please fill in all fields');
      return;
    }

    const chosenFlight = flights.find(f => f.id === flightId);
    const mockTicketId = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
    
    setTicketId(mockTicketId);
    setBookingConfirmed(true);
    
    if (onBookingSuccess) {
      onBookingSuccess({
        ticketId: mockTicketId,
        passengerName,
        flight: chosenFlight,
        ticketsCount
      });
    }
  };

  const handleReset = () => {
    setPassengerName('');
    setTicketsCount(1);
    setBookingConfirmed(false);
  };

  return (
    <div className="booking-card">
      <h2 className="section-title">Book Flight Ticket</h2>
      
      {bookingConfirmed ? (
        <div className="booking-success">
          <div className="success-icon">✓</div>
          <h3>Booking Successful!</h3>
          <p>Thank you for booking with us. Your ticket has been confirmed.</p>
          <div className="ticket-details">
            <p><strong>Ticket ID:</strong> {ticketId}</p>
            <p><strong>Passenger:</strong> {passengerName}</p>
            <p><strong>Flight:</strong> {flights.find(f => f.id === flightId)?.flightNo}</p>
            <p><strong>Tickets:</strong> {ticketsCount}</p>
          </div>
          <button className="reset-btn" onClick={handleReset}>Book Another Ticket</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="passengerName">Passenger Name</label>
            <input
              type="text"
              id="passengerName"
              placeholder="Enter passenger name"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="flightSelect">Select Flight</label>
            <select
              id="flightSelect"
              value={flightId}
              onChange={(e) => setFlightId(e.target.value)}
              required
            >
              <option value="">-- Choose a Flight --</option>
              {flights.map((flight) => (
                <option key={flight.id} value={flight.id}>
                  {flight.flightNo} - {flight.origin} to {flight.destination} ({flight.price})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ticketsCount">Number of Tickets</label>
            <input
              type="number"
              id="ticketsCount"
              min="1"
              max="10"
              value={ticketsCount}
              onChange={(e) => setTicketsCount(parseInt(e.target.value))}
              required
            />
          </div>

          <button type="submit" className="submit-booking-btn">
            Confirm Booking
          </button>
        </form>
      )}
    </div>
  );
}

export default BookingForm;
