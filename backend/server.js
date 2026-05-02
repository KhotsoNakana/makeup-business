const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

let bookings = [];
let contactMessages = [];

const services = [
  { id: 1, name: "Soft Glam Makeup", price: 350 },
  { id: 2, name: "Full Glam Makeup", price: 500 },
  { id: 3, name: "Bridal Makeup", price: 1200 },
  { id: 4, name: "Photoshoot Makeup", price: 700 },
];

app.get("/", (req, res) => {
  res.send("Makeup business backend is running");
});

app.get("/api/services", (req, res) => {
  res.json(services);
});

app.post("/api/bookings", (req, res) => {
  const {
    fullName,
    email,
    phone,
    service,
    bookingDate,
    bookingTime,
    location,
    paymentMethod,
    notes,
  } = req.body;

  if (
    !fullName ||
    !email ||
    !phone ||
    !service ||
    !bookingDate ||
    !bookingTime ||
    !location ||
    !paymentMethod
  ) {
    return res.status(400).json({ message: "Please fill in all required fields" });
  }

  const newBooking = {
    id: bookings.length + 1,
    full_name: fullName,
    email,
    phone,
    service,
    booking_date: bookingDate,
    booking_time: bookingTime,
    location,
    payment_method: paymentMethod,
    notes: notes || "",
    status: "Pending",
    created_at: new Date().toISOString(),
  };

  bookings.push(newBooking);

  res.status(201).json({
    message: "Booking created successfully",
    bookingId: newBooking.id,
  });
});

app.get("/api/bookings", (req, res) => {
  res.json(bookings.slice().reverse());
});

app.put("/api/bookings/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const booking = bookings.find((item) => item.id === Number(id));

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.status = status;

  res.json({ message: "Booking status updated successfully" });
});

app.delete("/api/bookings/:id", (req, res) => {
  const { id } = req.params;

  bookings = bookings.filter((item) => item.id !== Number(id));

  res.json({ message: "Booking deleted successfully" });
});

app.post("/api/contact", (req, res) => {
  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const newMessage = {
    id: contactMessages.length + 1,
    full_name: fullName,
    email,
    message,
    created_at: new Date().toISOString(),
  };

  contactMessages.push(newMessage);

  res.status(201).json({
    message: "Message sent successfully",
    messageId: newMessage.id,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});