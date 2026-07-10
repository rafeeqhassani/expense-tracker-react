const STEP_ADDERS = {
  daily: (date) => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    return nextDate;
  },
  weekly: (date) => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 7);
    return nextDate;
  },
  monthly: (date) => {
    const nextDate = new Date(date);
    nextDate.setMonth(nextDate.getMonth() + 1);
    return nextDate;
  },
  yearly: (date) => {
    const nextDate = new Date(date);
    nextDate.setFullYear(nextDate.getFullYear() + 1);
    return nextDate;
  },
};

function addStep(date, recurringType) {
  const stepAdder = STEP_ADDERS[recurringType];

  if (!stepAdder) {
    throw new Error(`Invalid recurring type: ${recurringType}`);
  }

  return stepAdder(date);
}

export default function generateMissingDates(
  currentDate,
  lastRunDate,
  recurringType,
) {
  const current = new Date(currentDate.toISOString().split("T")[0]);
  let lastRun = new Date(lastRunDate.toISOString().split("T")[0]);

  const missingDates = [];

  while (lastRun < current) {
    const nextDate = addStep(lastRun, recurringType);

    if (nextDate.getTime() === lastRun.getTime()) {
      break;
    }

    lastRun = nextDate;
    missingDates.push(new Date(lastRun));
  }

  return missingDates;
}
