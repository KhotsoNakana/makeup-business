const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((error) => {
  if (error) {
    console.error("Database connection failed:", error.message);
    return;
  }

  console.log("Connected to MySQL database");
});

app.get("/", (req, res) => {
  res.send("Makeup business backend is running");
});

// Get all services
app.get("/api/services", (req, res) => {
  const sql = "SELECT * FROM services ORDER BY id DESC";

  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Failed to get services" });
    }

    res.json(results);
  });
});

// Create a booking
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

  const sql = `
    INSERT INTO bookings 
    (full_name, email, phone, service, booking_date, booking_time, location, payment_method, notes, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    fullName,
    email,
    phone,
    service,
    bookingDate,
    bookingTime,
    location,
    paymentMethod,
    notes || "",
    "Pending",
  ];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to create booking" });
    }

    res.status(201).json({
      message: "Booking created successfully",
      bookingId: result.insertId,
    });
  });
});

// Get all bookings for admin dashboard
app.get("/api/bookings", (req, res) => {
  const sql = "SELECT * FROM bookings ORDER BY id DESC";

  db.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Failed to get bookings" });
    }

    res.json(results);
  });
});

// Update booking status
app.put("/api/bookings/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  const sql = "UPDATE bookings SET status = ? WHERE id = ?";

  db.query(sql, [status, id], (error) => {
    if (error) {
      return res.status(500).json({ message: "Failed to update booking status" });
    }

    res.json({ message: "Booking status updated successfully" });
  });
});

// Delete booking
app.delete("/api/bookings/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM bookings WHERE id = ?";

  db.query(sql, [id], (error) => {
    if (error) {
      return res.status(500).json({ message: "Failed to delete booking" });
    }

    res.json({ message: "Booking deleted successfully" });
  });
});

// Contact message
app.post("/api/contact", (req, res) => {
  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const sql = `
    INSERT INTO contact_messages 
    (full_name, email, message)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [fullName, email, message], (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Failed to send message" });
    }

    res.status(201).json({
      message: "Message sent successfully",
      messageId: result.insertId,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});