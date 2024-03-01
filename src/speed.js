import React, { useState, useEffect } from 'react';
import './speed.css'; 

function Speed({ speedValue = 100, batteryLifeValue = 80, capacity = 'Standard', tirePressure = 32 }) {
  const [speed, setSpeed] = useState(speedValue);
  const [batteryLife, setBatteryLife] = useState(batteryLifeValue);

  useEffect(() => {
    const socket = new WebSocket('wss://localhost:8080'); 
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data.speed);
      console.log(data.batteryLife);
      setSpeed(data.speed);
      setBatteryLife(data.batteryLife);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="speed-container">
      <div className="car-details">
        <img
          className="car-image" 
          src='https://i.pinimg.com/474x/3e/ba/9d/3eba9da7d936c955f81de800f1c635be.jpg'
          alt="Car"
        />

        <div className="car-info">
          <h2 className='Detail'>CAR DETAILS</h2>
          <div className="detail-box">
            <div className="detail-item">
              <label htmlFor="speedInput">Speed:</label>
              <span>{speed} km/h</span>
            </div>
            <div className="detail-item">
              <label htmlFor="batteryInput">Battery Life:</label>
              <span>{batteryLife}%</span>
            </div>
          </div>
          <div className="detail-box">
            <div className="detail-item">
              <label htmlFor="capacityInput">Capacity:</label>
              <span>{capacity}</span>
            </div>
            <div className="detail-item">
              <label htmlFor="tirePressureInput">Tire Pressure:</label>
              <span>{tirePressure} psi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Speed;
