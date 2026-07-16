import { useEffect } from "react";
import generateMissingDates from "../utils/expenseRecurring";

function useRecurring(expenses, setExpenses) {
  useEffect(() => {
    const today = new Date();

    const updatedExpenses = [];
    const generatedExpenses = [];

    for (const expense of expenses) {
      // Skip generated expenses
      if (expense.recurringId) {
        updatedExpenses.push(expense);
        continue;
      }

      // Skip non-recurring expenses
      if (expense.recurring === "none") {
        updatedExpenses.push(expense);
        continue;
      }

      // Skip invalid recurring expenses
      if (!expense.lastGeneratedDate) {
        updatedExpenses.push(expense);
        continue;
      }

      const missingDates = generateMissingDates(
        today,
        new Date(expense.lastGeneratedDate),
        expense.recurring,
      );

      // Nothing to generate
      if (missingDates.length === 0) {
        updatedExpenses.push(expense);
        continue;
      }

      // Create one expense for every missing date
      for (const missingDate of missingDates) {
        const formattedDate = missingDate.toISOString().split("T")[0];

        const alreadyExists = expenses.some(
          (existingExpense) =>
            existingExpense.recurringId === expense.id &&
            existingExpense.date === formattedDate,
        );

        if (alreadyExists) continue;

        generatedExpenses.push({
          ...expense,
          id: crypto.randomUUID(),
          recurringId: expense.id,
          date: formattedDate,
        });
      }

      // Update original recurring expense
      updatedExpenses.push({
        ...expense,
        lastGeneratedDate: missingDates[missingDates.length - 1]
          .toISOString()
          .split("T")[0],
      });
    }

    if (generatedExpenses.length > 0) {
      setExpenses([...updatedExpenses, ...generatedExpenses]);
    }
  }, [expenses, setExpenses]);
}

export default useRecurring;
