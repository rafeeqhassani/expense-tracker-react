import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAppContext from "../providers/useAppContext";
import { validateLoginForm } from "../utils/validation";
import { normalizeAuthData } from "../utils/authTransform";

function LoginPage() {
  const navigate = useNavigate();
  const { auth } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = validateLoginForm({
      email,
      password,
    });

    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]);
      return;
    }

    setError("");

    try {
      await auth.login(
        normalizeAuthData({
          email,
          password,
        }),
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
      setError(error.message);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <p className="auth-eyebrow">Welcome back</p>

          <h1>Login</h1>

          <p>Sign in to manage your expenses and budgets.</p>
        </div>

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>

            <input
              id="login-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={auth.loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>

            <input
              id="login-password"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={auth.loading}
            />
          </div>

          <button type="submit" disabled={auth.loading}>
            {auth.loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              className="auth-link"
              onClick={() => navigate("/register")}
            >
              Create one
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

export default LoginPage;
