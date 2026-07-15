import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookings } from "./context/BookingContext";
import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Booking from "./components/Booking";


const grounds = [
  "GALACTICOS",
  "PDF"
]





const slots = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
  "7:00 PM - 8:00 PM",
  "8:00 PM - 9:00 PM",
  "9:00 PM - 10:00 PM"
]


function Dashboard() {
  const [selectedGround, setSelectedGround] = useState("GALACTICOS");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);


  const selectedDay = selectedDate.toLocaleDateString("en-GB");

  const fullDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const navigate = useNavigate();
  const { bookings } = useBookings();

  return (
    <div className="app">

      <h1>⚽ {selectedGround}</h1>

      {/* Ground Selection */}
      <div className="grounds">
        {grounds.map((ground) => (
          <button
            key={ground}
            onClick={() => setSelectedGround(ground)}
          >
            {ground}
          </button>
        ))}
      </div>

      {/* Date Selection */}

<div
  className="date-display"
  onClick={() => setShowCalendar(true)}
>
  📅 {fullDate}
</div>
{showCalendar && (
  <div
    className="calendar-overlay"
    onClick={() => setShowCalendar(false)}
  >
    <div
      className="calendar-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <DatePicker
        inline
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          setShowCalendar(false);
        }}
      />
    </div>
  </div>
)}

      {/* Time Slots */}
      <div className="slots">
        {slots.map((time) => {

          const booking =
            bookings?.[selectedGround]?.[selectedDay]?.[time];

          return (
            <div
              key={time}
              className="slot"
onClick={() => {
  navigate("/booking", {
    state: {
      ground: selectedGround,
      day: selectedDay,
      time,
      booking,
    },
  });
}}
            >
    <div className="slot-time">
  {time}
</div>

{booking ? (
  Number(booking.balance) === 0 ? (

    <div className="slot-paid">

  <div className="booking-details">

    <div className="booking-top">

      <div className="customer-name">
        👤 {booking.name}
      </div>

      <span
        className={
          booking.sport === "Cricket"
            ? "cricket-badge"
            : "football-badge"
        }
      >
        {booking.sport}
      </span>

    </div>

    <div className="booking-bottom">

      <div className="customer-phone">
        📞 {booking.phone}
      </div>

      <div className="paid-status">
        ✅ PAID
      </div>

    </div>

  </div>

</div>

  ) : (

    <div className="slot-pending">

  <div className="booking-details">

    <div className="booking-top">

      <div className="customer-name">
        👤 {booking.name}
      </div>

      <span
        className={
          booking.sport === "Cricket"
            ? "cricket-badge"
            : "football-badge"
        }
      >
        {booking.sport}
      </span>

    </div>

    <div className="booking-bottom">

      <div className="customer-phone">
        📞 {booking.phone}
      </div>

      <div className="balance">
        Balance ₹{booking.balance}
      </div>

    </div>

  </div>

</div>

  )
) : (

  <div className="slot-available">
    🟢 Available
  </div>

)}
            </div>
          );
        })}
      </div>

    </div>
  );
}




function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Dashboard />}
      />


      <Route
        path="/booking"
        element={<Booking />}
      />


    </Routes>

  )

}


export default App