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
