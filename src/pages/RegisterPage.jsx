import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import useAppContext from "../providers/useAppContext";
import { validateRegisterForm } from "../utils/validation";
import { normalizeAuthData } from "../utils/authTransform";

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
    return <Navigate to="/dashboard" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = validateRegisterForm(formData);

    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]);
      return;
    }

    setError("");

    try {
      await auth.register(normalizeAuthData(formData));

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <p className="auth-eyebrow">Get started</p>

          <h1>Create Account</h1>

          <p>Create an account to start tracking your expenses and budgets.</p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="register-name">Name</label>

            <input
              id="register-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              disabled={auth.loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Email</label>

            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={auth.loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>

            <input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              disabled={auth.loading}
            />
          </div>

          <button type="submit" disabled={auth.loading}>
            {auth.loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <button
              type="button"
              className="auth-link"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>

          <button
            type="button"
            className="auth-demo-link"
            onClick={() => navigate("/demo")}
          >
            Try the recruiter demo
          </button>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;
