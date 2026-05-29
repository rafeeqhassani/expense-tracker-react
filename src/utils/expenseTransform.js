export function normalizedData(
  data,
  existingId = null,
  existingSelected = false,
) {
  const parsedAmount = Number(data.amount?.toString().trim());
  const isValidDate = data.date && !isNaN(Date.parse(data.date));
  return {
    id: existingId || crypto.randomUUID(),
    title: data.title.trim(),
    amount: Number.isFinite(parsedAmount) ? parsedAmount : 0,
    category: data.category.trim().toLowerCase(),
    date: isValidDate ? data.date : new Date().toISOString().split("T")[0],
    selected: existingSelected,
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
