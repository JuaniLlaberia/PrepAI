export const formatNumber = (number: number) => {
  const formatter = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 });
  return formatter.format(number);
};

export const formatTimer = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`;
};

export const formatDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return formatter.format(date);
};
