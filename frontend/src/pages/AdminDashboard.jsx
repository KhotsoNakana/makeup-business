import { useEffect, useState } from "react";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  async function fetchBookings() {
    try {
      const response = await fetch("https://makeup-business-backend.onrender.com/api/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      setMessage("Cannot load bookings. Make sure backend is running.");
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  async function updateStatus(id, status) {
    try {
      const response = await fetch(`https://makeup-business-backend.onrender.com/api/bookings/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      setMessage("Failed to update booking status.");
    }
  }

  async function deleteBooking(id) {
    const confirmDelete = confirm("Are you sure you want to delete this booking?");

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`https://makeup-business-backend.onrender.com/api/bookings/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      setMessage("Failed to delete booking.");
    }
  }

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <p>Manage client bookings from your database.</p>

      {message && <div className="message">{message}</div>}

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Total Bookings</h2>
          <p>{bookings.length}</p>
        </div>

        <div className="dashboard-card">
          <h2>Pending</h2>
          <p>{bookings.filter((booking) => booking.status === "Pending").length}</p>
        </div>

        <div className="dashboard-card">
          <h2>Confirmed</h2>
          <p>{bookings.filter((booking) => booking.status === "Confirmed").length}</p>
        </div>
      </div>

      <div className="table-box">
        <h2>Bookings</h2>

        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    {booking.full_name}
                    <br />
                    <small>{booking.email}</small>
                  </td>
                  <td>{booking.phone}</td>
                  <td>{booking.service}</td>
                  <td>{booking.booking_date}</td>
                  <td>{booking.booking_time}</td>
                  <td>{booking.payment_method}</td>
                  <td>{booking.status}</td>
                  <td>
                    <button onClick={() => updateStatus(booking.id, "Confirmed")}>
                      Confirm
                    </button>
                    <button onClick={() => updateStatus(booking.id, "Cancelled")}>
                      Cancel
                    </button>
                    <button onClick={() => deleteBooking(booking.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;