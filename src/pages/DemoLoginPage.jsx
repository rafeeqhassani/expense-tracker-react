import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAppContext from "../providers/useAppContext";

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
    <main className="demo-login-page">
      <div className="demo-login-content">
        <div className="demo-login-spinner" aria-hidden="true" />

        <h1>Loading Demo...</h1>

        <p>Preparing your recruiter demo account.</p>
      </div>
    </main>
  );
}

export default DemoLoginPage;
