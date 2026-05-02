import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === "admin" && password === "1234") {
      navigate("/dashboard");
    } else {
      alert("Wrong username or password");
    }
  }

  return (
    <div className="page">
      <div className="form-card">
        <h1>Admin Login</h1>
        <p>Login to manage your makeup bookings.</p>

        <form onSubmit={handleLogin}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <button type="submit">Login</button>
        </form>

        
      </div>
    </div>
  );
}

export default AdminLogin;