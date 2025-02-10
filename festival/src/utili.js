import NepaliDate from "nepali-date";

export const filterFestivalsByMonth = (festivals, currentDate) => {
  return festivals.filter((festival) => {
    const festivalDate = new NepaliDate(festival.date);
    return (
      festivalDate.getYear() === currentDate.getYear() &&
      festivalDate.getMonth() === currentDate.getMonth()
    );
  });
};

export const handleToday = (nepaliDate) => {
    const today=new Date()
  return (
    nepaliDate.getYear() === today.getYear() &&
    nepaliDate.getMonth() === today.getMonth() &&
    nepaliDate.getDate() === today.getDate()
  );
};
export const handleDayClick = (day, e, festivals, setSelectedDay, popupRef) => {
  const festival = festivals.find((f) => f.date === day.formattedNepaliDate);
  setSelectedDay(festival || null);

  const rect = e.target.getBoundingClientRect();
  if (popupRef.current) {
    popupRef.current.style.left = `${rect.left}px`;
    popupRef.current.style.top = `${rect.top + rect.height}px`;
  }
};
export const convertBSToAD = (bsDate) => {
  const full = new Date(bsDate.timestamp);
  const adYear = full.getFullYear();
  const adMonth = full.getMonth() + 1;
  const adDay = full.getDate();
  return `${adYear}-${adMonth < 10 ? "0" + adMonth : adMonth}-${
    adDay < 10 ? "0" + adDay : adDay
  }`;
};

