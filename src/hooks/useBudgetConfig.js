import { useState, useEffect, useCallback } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/storage";

const STORAGE_KEY = "budgetConfig";

const DEFAULT_BUDGET_CONFIG = {
  monthlyLimit: 50000,
  categoryLimits: {},
};

function useBudgetConfig() {
  const [budgetConfig, setBudgetConfig] = useState(() => {
    const saved = getFromLocalStorage(STORAGE_KEY);

    return {
      ...DEFAULT_BUDGET_CONFIG,
      ...saved,
      categoryLimits: {
        ...DEFAULT_BUDGET_CONFIG.categoryLimits,
        ...(saved?.categoryLimits ?? {}),
      },
    };
  });

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEY, budgetConfig);
  }, [budgetConfig]);

  const updateMonthlyLimit = useCallback((value) => {
    setBudgetConfig((prev) => ({
      ...prev,
      monthlyLimit: value,
    }));
  }, []);

  const updateCategoryLimit = useCallback((category, value) => {
    setBudgetConfig((prev) => ({
      ...prev,
      categoryLimits: {
        ...prev.categoryLimits,
        [category]: value,
      },
    }));
  }, []);

  const resetBudgetConfig = useCallback(() => {
    setBudgetConfig(DEFAULT_BUDGET_CONFIG);
  }, []);

  return {
    budgetConfig,
    updateMonthlyLimit,
    updateCategoryLimit,
    resetBudgetConfig,
  };
}

export default useBudgetConfig;
