import { useState } from "react";

function Booking() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    bookingDate: "",
    bookingTime: "",
    location: "",
    paymentMethod: "",
    notes: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Booking submitted successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          service: "",
          bookingDate: "",
          bookingTime: "",
          location: "",
          paymentMethod: "",
          notes: "",
        });
      } else {
        setMessage(data.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      setMessage("Cannot connect to backend. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="form-card">
        <h1>Book Your Makeup Appointment</h1>
        <p>Fill in your details and we will confirm your booking.</p>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Select Service</option>
            <option value="Soft Glam Makeup">Soft Glam Makeup</option>
            <option value="Full Glam Makeup">Full Glam Makeup</option>
            <option value="Bridal Makeup">Bridal Makeup</option>
            <option value="Makeup Lesson">Makeup Lesson</option>
          </select>

          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="bookingTime"
            value={formData.bookingTime}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location / Address"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="COD">Cash on Delivery / Pay in Person</option>
            <option value="Online">Online Payment</option>
          </select>

          <textarea
            name="notes"
            placeholder="Extra notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;