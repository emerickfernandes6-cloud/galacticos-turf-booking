import { createContext, useContext, useState, useEffect } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
  const savedBookings = localStorage.getItem("bookings");

  return savedBookings ? JSON.parse(savedBookings) : {};
});
useEffect(() => {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}, [bookings]);

  const addBooking = (ground, day, time, booking) => {
    setBookings((prev) => ({
      ...prev,
      [ground]: {
        ...(prev[ground] || {}),
        [day]: {
          ...(prev[ground]?.[day] || {}),
          [time]: booking,
        },
      },
    }));
  };

  const updateBooking = (ground, day, time, updatedBooking) => {
    setBookings((prev) => ({
      ...prev,
      [ground]: {
        ...(prev[ground] || {}),
        [day]: {
          ...(prev[ground]?.[day] || {}),
          [time]: updatedBooking,
        },
      },
    }));
  };

  const deleteBooking = (ground, day, time) => {
    setBookings((prev) => {
      const updated = { ...prev };

      if (updated[ground]?.[day]?.[time]) {
        delete updated[ground][day][time];
      }

      return updated;
    });
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        updateBooking,
        deleteBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBookings = () => useContext(BookingContext);