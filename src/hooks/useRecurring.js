import { useEffect } from "react";
import generateMissingDates from "../utils/expenseRecurring";

function useRecurring(expenses, setExpenses) {
  useEffect(() => {
    const today = new Date();
    const generatedExpenses = [];

    for (const expense of expenses) {
      if (expense.recurring === "none") continue;
      if (!expense.lastGeneratedDate) continue;

      const lastDate = new Date(expense.lastGeneratedDate);
      const missingdates = generateMissingDates(
        today,
        lastDate,
        expense.recurring,
      );

      for (const date of missingdates) {
        const formattedDate = date.toISOString().split("T")[0];
        const alreadyExists = expenses.some(
          (exp) =>
            exp.title === expense.title &&
            exp.amount === expense.amount &&
            exp.category === expense.category &&
            exp.date === formattedDate,
        );
        if (alreadyExists) continue;

        generatedExpenses.push({
          ...expense,
          date: formattedDate,
          lastGeneratedDate: formattedDate,
        });
      }
    }

    if (generatedExpenses.length > 0) {
      setExpenses((prev) => [...prev, ...generatedExpenses]);
    }
  }, [expenses]);
}

export default useRecurring;
