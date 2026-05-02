function Payment() {
  return (
    <div className="page">
      <div className="form-card">
        <h1>Payment Options</h1>
        <p>Choose how you want to pay for your makeup booking.</p>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>COD / Pay in Person</h2>
            <p>You can pay cash when you arrive for your appointment.</p>
          </div>

          <div className="dashboard-card">
            <h2>Online Payment</h2>
            <p>Online payment will be connected later using a payment provider.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;