import { useState, useEffect, useCallback } from "react";
import { getBudget, saveBudget } from "../services/budgetApi";

const DEFAULT_BUDGET_CONFIG = {
  monthlyLimit: 0,
  categoryLimits: {},
};

function useBudgetConfig(showToastMessage) {
  const [budgetConfig, setBudgetConfig] = useState(DEFAULT_BUDGET_CONFIG);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBudget() {
      try {
        const budget = await getBudget();

        if (budget) {
          setBudgetConfig({
            ...DEFAULT_BUDGET_CONFIG,
            ...budget,
            categoryLimits: {
              ...DEFAULT_BUDGET_CONFIG.categoryLimits,
              ...(budget.categoryLimits ?? {}),
            },
          });
        }
      } catch (error) {
        console.error("Failed to load budget", error);

        showToastMessage(error.message, "error");
      } finally {
        setLoading(false);
      }
    }

    loadBudget();
  }, [showToastMessage]);

  const saveConfig = useCallback(
    async (newConfig) => {
      try {
        await saveBudget(newConfig);

        showToastMessage("Budget updated successfully", "success");
      } catch (error) {
        console.error("Failed to save budget", error);

        showToastMessage(error.message, "error");
      }
    },
    [showToastMessage],
  );

  const updateMonthlyLimit = useCallback(
    async (valueOrUpdater) => {
      const updatedConfig = {
        ...budgetConfig,
        monthlyLimit:
          typeof valueOrUpdater === "function"
            ? valueOrUpdater(budgetConfig.monthlyLimit)
            : Number(valueOrUpdater),
      };

      setBudgetConfig(updatedConfig);

      await saveConfig(updatedConfig);
    },
    [budgetConfig, saveConfig],
  );

  const updateCategoryLimit = useCallback(
    async (category, valueOrUpdater) => {
      const updatedConfig = {
        ...budgetConfig,
        categoryLimits: {
          ...budgetConfig.categoryLimits,
          [category]:
            typeof valueOrUpdater === "function"
              ? valueOrUpdater(budgetConfig.categoryLimits[category] ?? 0)
              : Number(valueOrUpdater),
        },
      };

      setBudgetConfig(updatedConfig);

      await saveConfig(updatedConfig);
    },
    [budgetConfig, saveConfig],
  );

  const resetBudgetConfig = useCallback(() => {
    setBudgetConfig(DEFAULT_BUDGET_CONFIG);

    showToastMessage("Budget reset", "success");
  }, [showToastMessage]);

  return {
    budgetConfig,
    loading,
    updateMonthlyLimit,
    updateCategoryLimit,
    resetBudgetConfig,
  };
}

export default useBudgetConfig;
