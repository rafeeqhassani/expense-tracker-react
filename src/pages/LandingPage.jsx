import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="landing-page">
      <section className="landing-hero">
        <div className="landing-content">
          <p className="landing-eyebrow">Personal Finance</p>

          <h1>Expense Tracker</h1>

          <p className="landing-description">
            Manage your expenses, budgets, analytics and recurring payments in
            one place.
          </p>

          <div className="landing-actions">
            <button
              type="button"
              className="btn btn-primary landing-primary-btn"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>

            <button
              type="button"
              className="landing-secondary-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>

          <section className="demo-card">
            <div className="demo-card-content">
              <p className="demo-card-eyebrow">For Recruiters</p>

              <h2>Recruiter Demo</h2>

              <p>
                Explore the full application using a pre-configured demo
                account.
              </p>
            </div>

            <button
              type="button"
              className="landing-demo-btn"
              onClick={() => navigate("/demo")}
            >
              Launch Demo
            </button>
          </section>
        </div>
      </section>

      <section className="landing-features">
        <div className="landing-features-content">
          <p className="landing-eyebrow">What you can do</p>

          <h2>Everything you need to manage spending</h2>

          <ul>
            <li>Track daily expenses</li>
            <li>Create and manage budgets</li>
            <li>View analytics dashboard</li>
            <li>Manage recurring expenses</li>
            <li>Secure JWT authentication</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
