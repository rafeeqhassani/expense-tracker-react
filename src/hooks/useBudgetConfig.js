import { useState, useEffect, useCallback, useRef } from "react";
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
function useBudgetConfig(showToastMessage, authLoading, token) {
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

  const saveBudgetConfig = useCallback(async () => {
    await saveConfig(budgetConfig);
  }, [budgetConfig, saveConfig]);

  useEffect(() => {
    if (authLoading || !token) return;

    loadBudget();
  }, [loadBudget, authLoading, token]);

  /**
   * Updates the overall monthly limit, accepting either a new value
   * or an updater function of the previous value.
   */

  const updateMonthlyLimit = useCallback((valueOrUpdater) => {
    setBudgetConfig((prev) => ({
      ...prev,
      monthlyLimit: Math.max(
        0,
        resolveNumericValue(valueOrUpdater, prev.monthlyLimit),
      ),
    }));
  }, []);

  /**
   * Updates the limit for a single category, accepting either a new
   * value or an updater function of the previous value.
   */

  const updateCategoryLimit = useCallback((category, valueOrUpdater) => {
    setBudgetConfig((prev) => ({
      ...prev,
      categoryLimits: {
        ...prev.categoryLimits,
        [category]: Math.max(
          0,
          resolveNumericValue(
            valueOrUpdater,
            prev.categoryLimits[category] ?? 0,
          ),
        ),
      },
    }));
  }, []);

  /**
   * Resets the budget config back to its default (unsaved) state.
   */
  const resetBudgetConfig = useCallback(async () => {
    try {
      const defaultConfig = DEFAULT_BUDGET_CONFIG;

      await saveBudget(defaultConfig);

      setBudgetConfig(defaultConfig);
    } catch (error) {
      console.error("Failed to reset budget", error);
      throw error;
    }
  }, []);

  return {
    budgetConfig,
    loading,
    error,
    updateMonthlyLimit,
    updateCategoryLimit,
    resetBudgetConfig,
    loadBudget,
    saveBudgetConfig,
  };
}

export default useBudgetConfig;
