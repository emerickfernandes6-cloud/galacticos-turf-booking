function Slot({ time, booking }) {
  return (
    <div className={`slot ${booking ? "booked" : "available"}`}>
      <span>{time}</span>
      <span>{booking ? booking : "Available"}</span>
    </div>
  );
}

export default Slot;