import { useEffect } from "react";
import generateMissingDates from "../utils/expenseRecurring";

function useRecurring(expenses, setExpenses) {
  useEffect(() => {
    const today = new Date();
    const generatedExpenses = [];

    for (const expense of expenses) {
      if (expense.recurring === "none") continue;

      if (!expense.lastGeneratedDate) continue;

      const lastGeneratedDate = new Date(expense.lastGeneratedDate);

      const missingDates = generateMissingDates(
        today,
        lastGeneratedDate,
        expense.recurring,
      );

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
          lastGeneratedDate: formattedDate,
        });
      }
    }

    if (generatedExpenses.length > 0) {
      setExpenses((prev) => [...prev, ...generatedExpenses]);
    }
  }, [expenses, setExpenses]);
}

export default useRecurring;
