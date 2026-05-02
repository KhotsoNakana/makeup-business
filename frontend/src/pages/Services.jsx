function Services() {
  const services = [
    {
      name: "Soft Glam Makeup",
      price: "R450",
      description: "Natural soft glam look for events, birthdays, and photoshoots.",
    },
    {
      name: "Full Glam Makeup",
      price: "R650",
      description: "Professional full glam makeup for parties and special occasions.",
    },
    {
      name: "Bridal Makeup",
      price: "R1200",
      description: "Luxury bridal makeup service for weddings.",
    },
    {
      name: "Makeup Lesson",
      price: "R800",
      description: "One-on-one personal makeup lesson.",
    },
  ];

  return (
    <div className="page">
      <h1>Our Makeup Services</h1>
      <p>Choose the perfect makeup service for your special day.</p>

      <div className="dashboard-grid">
        {services.map((service, index) => (
          <div className="dashboard-card" key={index}>
            <h2>{service.name}</h2>
            <h3>{service.price}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;