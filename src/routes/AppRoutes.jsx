import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import BudgetPage from "../pages/BudgetPage";
import ExpensePage from "../pages/ExpensePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="budget" element={<BudgetPage />} />
        <Route path="expenses" element={<ExpensePage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
