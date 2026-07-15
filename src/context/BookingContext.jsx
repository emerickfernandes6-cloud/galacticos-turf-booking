import { createContext, useContext, useState, useEffect } from "react";

import { db } from "../services/firebase";

import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const BookingContext = createContext();

export function BookingProvider({ children }) {

const [bookings, setBookings] = useState(() => {
  const savedBookings = localStorage.getItem("bookings");

  return savedBookings ? JSON.parse(savedBookings) : {};
});

useEffect(() => {

  const unsubscribe = onSnapshot(
    collection(db, "bookings"),
    (snapshot) => {

      const loadedBookings = {};

      snapshot.forEach((doc) => {

        const booking = doc.data();

        if (!loadedBookings[booking.ground]) {
          loadedBookings[booking.ground] = {};
        }

        if (!loadedBookings[booking.ground][booking.day]) {
          loadedBookings[booking.ground][booking.day] = {};
        }

        loadedBookings[booking.ground][booking.day][booking.time] = {
  sport: booking.sport,
  name: booking.name,
  phone: booking.phone,
  totalAmount: booking.totalAmount,
  amountPaid: booking.amountPaid,
  balance: booking.balance,
};

      });

      setBookings(loadedBookings);

      console.log("🔄 Live update received");

    }
  );

  return () => unsubscribe();

}, []);



  const addBooking = async (ground, day, time, booking) => {

  const bookingId = `${ground}_${day}_${time}`
    .replaceAll("/", "-")
    .replaceAll(":", "")
    .replaceAll(" ", "_");

  try {

    await setDoc(
      doc(db, "bookings", bookingId),
      {
        ground,
        day,
        time,
        ...booking,
      }
    );

    console.log("✅ Booking saved to Firestore");

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

  } catch (error) {
    console.error("❌ Error saving booking:", error);
  }

};
 const updateBooking = async (ground, day, time, updatedBooking) => {

  const bookingId = `${ground}_${day}_${time}`
    .replaceAll("/", "-")
    .replaceAll(":", "")
    .replaceAll(" ", "_");

  try {

    await updateDoc(
      doc(db, "bookings", bookingId),
      {
        ...updatedBooking,
      }
    );

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

    console.log("✅ Booking updated");

  } catch (error) {
    console.error(error);
  }

};

  const deleteBooking = async (ground, day, time) => {

  const bookingId = `${ground}_${day}_${time}`
    .replaceAll("/", "-")
    .replaceAll(":", "")
    .replaceAll(" ", "_");

  try {

    await deleteDoc(
      doc(db, "bookings", bookingId)
    );

    setBookings((prev) => {

      const updated = structuredClone(prev);

      delete updated[ground][day][time];

      return updated;

    });

    console.log("🗑 Booking deleted");

  } catch (error) {
    console.error(error);
  }

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