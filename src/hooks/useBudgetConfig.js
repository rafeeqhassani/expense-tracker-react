import { useState, useEffect, useCallback } from "react";
import { getBudget, saveBudget } from "../services/budgetApi";

const DEFAULT_BUDGET_CONFIG = {
  monthlyLimit: 0,
  categoryLimits: {},
};

/**
 * Merges a partial/raw budget object (e.g. from the API) on top of
 * the default config, ensuring `categoryLimits` is always a fully
 * formed object rather than `undefined`.
 */
function mergeWithDefaults(budget) {
  return {
    ...DEFAULT_BUDGET_CONFIG,
    ...budget,
    categoryLimits: {
      ...DEFAULT_BUDGET_CONFIG.categoryLimits,
      ...(budget.categoryLimits ?? {}),
    },
  };
}

/**
 * Resolves a value that may either be a plain number/string or an
 * updater function of the previous value, returning a numeric result.
 */
function resolveNumericValue(valueOrUpdater, previousValue) {
  return typeof valueOrUpdater === "function"
    ? valueOrUpdater(previousValue)
    : Number(valueOrUpdater);
}

/**
 * Manages the budget configuration (overall monthly limit and
 * per-category limits), including loading, persisting, and
 * resetting it.
 *
 * @param {(message: string, type: "success" | "error") => void} showToastMessage
 */
function useBudgetConfig(showToastMessage) {
  const [budgetConfig, setBudgetConfig] = useState(DEFAULT_BUDGET_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Load the persisted budget config once on mount.
  const loadBudget = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const budget = await getBudget();

      if (budget) {
        setBudgetConfig(mergeWithDefaults(budget));
      }
    } catch (error) {
      console.error("Failed to load budget", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBudget();
  }, [loadBudget]);

  /**
   * Persists a budget config to the backend and notifies the user
   * of the outcome.
   */
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

  /**
   * Updates the overall monthly limit, accepting either a new value
   * or an updater function of the previous value.
   */
  const updateMonthlyLimit = useCallback(
    async (valueOrUpdater) => {
      const updatedConfig = {
        ...budgetConfig,
        monthlyLimit: resolveNumericValue(
          valueOrUpdater,
          budgetConfig.monthlyLimit,
        ),
      };

      setBudgetConfig(updatedConfig);
      await saveConfig(updatedConfig);
    },
    [budgetConfig, saveConfig],
  );

  /**
   * Updates the limit for a single category, accepting either a new
   * value or an updater function of the previous value.
   */
  const updateCategoryLimit = useCallback(
    async (category, valueOrUpdater) => {
      const previousValue = budgetConfig.categoryLimits[category] ?? 0;

      const updatedConfig = {
        ...budgetConfig,
        categoryLimits: {
          ...budgetConfig.categoryLimits,
          [category]: resolveNumericValue(valueOrUpdater, previousValue),
        },
      };

      setBudgetConfig(updatedConfig);
      await saveConfig(updatedConfig);
    },
    [budgetConfig, saveConfig],
  );

  /**
   * Resets the budget config back to its default (unsaved) state.
   */
  const resetBudgetConfig = useCallback(() => {
    setBudgetConfig(DEFAULT_BUDGET_CONFIG);
    showToastMessage("Budget reset", "success");
  }, [showToastMessage]);

  return {
    budgetConfig,
    loading,
    error,
    updateMonthlyLimit,
    updateCategoryLimit,
    resetBudgetConfig,
    loadBudget,
  };
}

export default useBudgetConfig;
