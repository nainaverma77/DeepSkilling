import React, { useState } from 'react';
import Greeting from './components/Greeting';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import FlightDetails, { FLIGHTS } from './components/FlightDetails';
import BookingForm from './components/BookingForm';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setSelectedFlight(null);
  };

  // Defining Element Variables for conditional rendering:
  let button;
  if (isLoggedIn) {
    button = <LogoutButton onClick={handleLogoutClick} />;
  } else {
    button = <LoginButton onClick={handleLoginClick} />;
  }

  return (
    <div className="app-container">
      {/* Auth Panel matching the screenshot layout: a clean, prominent welcome card */}
      <div className="auth-panel">
        <Greeting isLoggedIn={isLoggedIn} />
        <div className="button-container">
          {button}
        </div>
      </div>

      {/* Main content displaying flights & bookings */}
      <div className="dashboard-content">
        <div className="grid-layout">
          <div className="grid-item flight-section">
            <FlightDetails 
              isLoggedIn={isLoggedIn} 
              onSelectFlight={setSelectedFlight} 
            />
          </div>
          
          {isLoggedIn && (
            <div className="grid-item booking-section">
              <BookingForm 
                isLoggedIn={isLoggedIn} 
                selectedFlight={selectedFlight} 
                flights={FLIGHTS} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
