import { useState, useEffect, useCallback } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/storage";

const STORAGE_KEY = "budgetConfig";

const DEFAULT_BUDGET_CONFIG = {
  monthlyLimit: 50000,
  categoryLimits: {},
};

function useBudgetConfig() {
  const [budgetConfig, setBudgetConfig] = useState(() => {
    const savedConfig = getFromLocalStorage(STORAGE_KEY);

    return {
      ...DEFAULT_BUDGET_CONFIG,
      ...savedConfig,
      categoryLimits: {
        ...DEFAULT_BUDGET_CONFIG.categoryLimits,
        ...(savedConfig?.categoryLimits ?? {}),
      },
    };
  });

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEY, budgetConfig);
  }, [budgetConfig]);

  const updateMonthlyLimit = useCallback((valueOrUpdater) => {
    setBudgetConfig((prev) => ({
      ...prev,
      monthlyLimit:
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(prev.monthlyLimit)
          : Number(valueOrUpdater),
    }));
  }, []);

  const updateCategoryLimit = useCallback((category, valueOrUpdater) => {
    setBudgetConfig((prev) => ({
      ...prev,
      categoryLimits: {
        ...prev.categoryLimits,
        [category]:
          typeof valueOrUpdater === "function"
            ? valueOrUpdater(prev.categoryLimits[category] ?? 0)
            : Number(valueOrUpdater),
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
