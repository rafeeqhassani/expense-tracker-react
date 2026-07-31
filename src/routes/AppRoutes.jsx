import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import BudgetPage from "../pages/BudgetPage";
import ExpensePage from "../pages/ExpensePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import LandingPage from "../pages/LandingPage";
import DemoLoginPage from "../pages/DemoLoginPage";
import ActivitiesPage from "../pages/ActivitiesPage";
import CategoryAnalyticsPage from "../pages/CategoryAnalyticsPage";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/demo" element={<DemoLoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="budget" element={<BudgetPage />} />
        <Route path="expenses" element={<ExpensePage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="categories" element={<CategoryAnalyticsPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
