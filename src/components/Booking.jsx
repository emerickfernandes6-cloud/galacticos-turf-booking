import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookings } from "../context/BookingContext";
import "../App.css";


const grounds = [
  "GALACTICOS",
  "PDF"
]


const days = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun"
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


function Booking() {


  const location = useLocation();
  const existingBooking = location.state?.booking;

  const navigate = useNavigate();
  const { addBooking, updateBooking, deleteBooking } = useBookings();

  const [ground] = useState(location.state?.ground || "GALACTICOS");
  const [day] = useState(location.state?.day || "");
  const [time] = useState(location.state?.time || slots[0]);

  const [name, setName] = useState(existingBooking?.name || "");

  const [phone, setPhone] = useState(existingBooking?.phone || "");
  const [sport, setSport] = useState(
  existingBooking?.sport || "Football"
);

const totalAmount =
  sport === "Football" ? 1000 : 1500;

  const [amountPaid, setAmountPaid] = useState(
  existingBooking?.amountPaid ?? 200
);

  const balance = totalAmount - (Number(amountPaid) || 0);



 function confirmBooking() {

  if (!name || !phone) {
    alert("Please enter customer name and phone number.");
    return;
  }

  const bookingData = {
  sport,
  name,
  phone,
  totalAmount,
  amountPaid: Number(amountPaid),
  balance,
};

  if (existingBooking) {
    updateBooking(
      ground,
      day,
      time,
      bookingData
    );
  } else {
    addBooking(
      ground,
      day,
      time,
      bookingData
    );
  }

  navigate("/");
}

function removeBooking() {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this booking?"
  );

  if (!confirmDelete) return;

  deleteBooking(
    ground,
    day,
    time
  );

  navigate("/");

}
  return (

    <div className="booking-page">


<h1>
  {existingBooking ? "✏️ Edit Booking" : "⚽ New Booking"}
</h1>



      <div className="booking-card">


        <div className="form-group">

          <label>
            Ground
          </label>

    <input
      type="text"
      value={ground}
      readOnly
    />

        </div>




        <div className="form-group">

          <label>
            Day
          </label>


          <input
  type="text"
  value={day}
  readOnly
/>


        </div>





        <div className="form-group">

          <label>
            Time
          </label>


         <input
  type="text"
  value={time}
  readOnly
/>


        </div>






        <div className="form-group">

          <label>
            Customer Name
          </label>


          <input

            type="text"

            placeholder="Enter customer name"

            value={name}

            onChange={(e)=>setName(e.target.value)}

          />


        </div>






        <div className="form-group">

          <label>
            Phone Number
          </label>


          <input

            type="text"

            placeholder="Enter phone number"

            value={phone}

            onChange={(e)=>setPhone(e.target.value)}

          />


        </div>
        <div className="form-group">

  <label>Sport</label>

  <select
    value={sport}
    onChange={(e) => setSport(e.target.value)}
  >
    <option value="Football">⚽ Football</option>
    <option value="Cricket">🏏 Cricket</option>
  </select>

</div>
  <div className="form-group">

  <label>Total Amount (₹)</label>

  <input
  type="text"
  value={`₹${totalAmount}`}
  readOnly
/>

</div>

<div className="form-group">

  <label>Amount Paid (₹)</label>

  <input
    type="number"
    placeholder="Enter amount paid"
    value={amountPaid}
    onChange={(e) => setAmountPaid(e.target.value)}
  />

</div>





<div className="form-group">

  <label>Balance (₹)</label>

  <input
    type="text"
    value={`₹${balance}`}
    readOnly
  />

</div>
        <button
  className="confirm-button"
  onClick={confirmBooking}
>
  {existingBooking ? "Update Booking" : "Confirm Booking"}
</button>

{existingBooking && (
  <button
    className="delete-button"
    onClick={removeBooking}
  >
    🗑 Delete Booking
  </button>
)}



      </div>


    </div>

  )

}


export default Booking