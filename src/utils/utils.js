export const entriesInMonth = (date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  return Array.from(
    { length: new Date(year, month + 1, 0).getDate() },
    (_, i) => ({ date: new Date(year, month, i + 1) })
  );
};

export const getPreviousMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() - 1, 1);

export const getNextMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 1);

export const getStartOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const getEndOfMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

export const getDateIndex = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDay() - 1);
