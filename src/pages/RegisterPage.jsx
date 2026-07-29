import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import useAppContext from "../providers/useAppContext";
import { validateRegisterForm } from "../utils/validation";

function RegisterPage() {
  const navigate = useNavigate();
  const { auth } = useAppContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  if (auth.token) {
    return <Navigate to="/" replace />;
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const errors = validateRegisterForm(formData);

    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]);
      return;
    }

    setError("");

    try {
      await auth.register(formData);

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div>
          <h1>Create Account</h1>

          {error && <p className="auth-error">{error}</p>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button type="submit" disabled={auth.loading}>
              {auth.loading ? "Creating Account..." : "Register"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;
