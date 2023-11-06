const SEC_PER_HOUR = 3600;
const SEC_PER_MINUTE = 60;

export const formatRunTime = (runTime: number) => {
  const hours = Math.floor(runTime / SEC_PER_HOUR);
  const minutes = Math.floor((runTime % SEC_PER_HOUR) / SEC_PER_MINUTE);
  const seconds = Math.floor(runTime % SEC_PER_MINUTE);

  const preparedHours = String(hours).padStart(2, '0');
  const preparedMinutes = String(minutes).padStart(2, '0');
  const preparedSeconds = String(seconds).padStart(2, '0');

  return `${preparedHours}:${preparedMinutes}:${preparedSeconds}`;
};