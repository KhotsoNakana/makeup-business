import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section className="hero">
        <div>
          <h1>Professional Makeup for Every Occasion</h1>
          <p>Book bridal, graduation, photoshoot, soft glam and full glam makeup.</p>
          <Link className="btn" to="/booking">Book Appointment</Link>
        </div>
      </section>

      <section className="section">
        <h2>Our Services</h2>

        <div className="service-grid">
          <div className="card">
            <h3>Natural Makeup</h3>
            <p>Clean and soft beauty look.</p>
            <strong>R350</strong>
          </div>

          <div className="card">
            <h3>Soft Glam</h3>
            <p>Perfect for birthdays and events.</p>
            <strong>R450</strong>
          </div>

          <div className="card">
            <h3>Full Glam</h3>
            <p>Bold and camera-ready look.</p>
            <strong>R600</strong>
          </div>

          <div className="card">
            <h3>Bridal Makeup</h3>
            <p>Premium wedding makeup.</p>
            <strong>R1200</strong>
          </div>
        </div>
      </section>

      <section className="section light">
        <h2>Why Choose Us?</h2>

        <div className="service-grid">
          <div className="card">
            <h3>Professional</h3>
            <p>Friendly, clean and reliable service.</p>
          </div>

          <div className="card">
            <h3>Easy Booking</h3>
            <p>Clients can book online anytime.</p>
          </div>

          <div className="card">
            <h3>Flexible Payment</h3>
            <p>Choose COD or online payment.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Client Reviews</h2>
        <div className="review">“My makeup was beautiful and lasted the whole day!”</div>
        <div className="review">“Very professional. I will definitely book again.”</div>
      </section>

      <a className="whatsapp" href="https://wa.me/27810000000" target="_blank">
        WhatsApp
      </a>
    </main>
  );
}

export default Home;