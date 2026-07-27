import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAppContext from "../providers/useAppContext";
import "../styles/auth.css";

function DemoLoginPage() {
  const navigate = useNavigate();
  const { auth } = useAppContext();

  useEffect(() => {
    async function loginDemo() {
      try {
        await auth.demoLogin();

        navigate("/dashboard");
      } catch (error) {
        console.error("Demo login failed:", error.message);
      }
    }

    loginDemo();
  }, [auth, navigate]);

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Loading Demo...</h1>
        <p>Preparing recruiter demo account.</p>
      </section>
    </main>
  );
}

export default DemoLoginPage;
