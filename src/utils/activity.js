export function createActivity(type, message) {
  return {
    id: crypto.randomUUID(),
    type,
    message,
    createdAt: new Date().toISOString().split("T")[0],
  };
}
