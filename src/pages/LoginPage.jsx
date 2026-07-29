import { useState } from "react";
import useAppContext from "../providers/useAppContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const { auth } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function validateLoginForm(data) {
    const errors = {};

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email format";
    }

    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

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
      await auth.login({
        email,
        password,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
      setError(error.message);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div>
          <h1>Login</h1>
          {error && <p className="auth-error">{error}</p>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" disabled={auth.loading}>
              {auth.loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
