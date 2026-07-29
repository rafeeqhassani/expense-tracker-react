import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "../utils/validation";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="landing">
      <section className="landing-hero">
        <h1>Expense Tracker</h1>

        <p>
          Manage your expenses, budgets, analytics and recurring payments in one
          place.
        </p>

        <div className="landing-actions">
          <button
            className="landing-primary-btn"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>

          <button
            className="landing-secondary-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

        <section className="demo-card">
          <h3>Recruiter Demo</h3>

          <p>
            Explore the full application using a pre-configured demo account.
          </p>

          <button
            className="landing-demo-btn"
            onClick={() => navigate("/demo")}
          >
            Launch Demo
          </button>
        </section>
      </section>

      <section className="landing-features">
        <h2>Features</h2>

        <ul>
          <li>Track daily expenses</li>
          <li>Create and manage budgets</li>
          <li>View analytics dashboard</li>
          <li>Manage recurring expenses</li>
          <li>Secure JWT authentication</li>
        </ul>
      </section>
    </main>
  );
}

export default LandingPage;
