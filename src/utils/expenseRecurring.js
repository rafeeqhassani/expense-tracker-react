function addStep(date, type) {
  switch (type) {
    case "daily":
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;

    case "weekly":
      const weeklyDate = new Date(date);
      weeklyDate.setDate(weeklyDate.getDate() + 7);
      return weeklyDate;

    case "monthly":
      const monthlyDate = new Date(date);
      monthlyDate.setMonth(monthlyDate.getMonth() + 1);
      return monthlyDate;

    case "yearly":
      const yearlyDate = new Date(date);
      yearlyDate.setFullYear(yearlyDate.getFullYear() + 1);
      return yearlyDate;

    default:
      return date;
  }
}

export default function generateMissingDates(
  currentDate,
  lastRunDate,
  recurringType,
) {
  let lastRun = new Date(lastRunDate.toISOString().split("T")[0]);
  const current = new Date(currentDate.toISOString().split("T")[0]);
  const allMissingDates = [];
  while (lastRun < current) {
    lastRun = addStep(lastRun, recurringType);
    allMissingDates.push(new Date(lastRun));
  }
  return allMissingDates;
}
