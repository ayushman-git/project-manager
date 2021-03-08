const useDaysLeft = (firestoreDays) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const today = new Date();
  const diffDays = Math.round(
    Math.abs((today - new Date(firestoreDays)) / oneDay)
  );
  return diffDays;
};

export default useDaysLeft;
