function Contact() {
  return (
    <div className="page">
      <div className="form-card">
        <h1>Contact Us</h1>
        <p>Send us a message for questions or special bookings.</p>

        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <textarea placeholder="Your message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;