export function normalizeExpenseData(data, existingId = null) {
  const parsedAmount = Number(String(data.amount).trim());
  const isValidDate = data.date && !isNaN(Date.parse(data.date));

  return {
    id: existingId || crypto.randomUUID(),
    title: data.title.trim(),
    amount: Number.isFinite(parsedAmount) ? parsedAmount : 0,
    category: (data.customCategory || data.category).trim().toLowerCase(),
    date: isValidDate ? data.date : new Date().toISOString().split("T")[0],
    recurring: data.recurring ?? "none",
  };
}

export function isSameData(oldData, newData) {
  return (
    oldData.title === newData.title &&
    Number(oldData.amount) === Number(newData.amount) &&
    (oldData.category || "").trim().toLowerCase() ===
      (newData.category || "").trim().toLowerCase() &&
    oldData.date === newData.date
  );
}
