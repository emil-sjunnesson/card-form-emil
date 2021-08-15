export const getYears = (yearsToShow = 20) => {
  const years: string[] = [];
  const thisYear = new Date().getFullYear();
  for (let year = thisYear; year < thisYear + yearsToShow; year++) {
    years.push(year.toString());
  }
  return years;
};

export const getMonths = () => {
  const months: string[] = [];
  for (let month = 1; month < 13; month++) {
    let prefix = '';
    if (month < 10) prefix = '0';
    months.push(prefix + month);
  }
  return months;
};
