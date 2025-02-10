import { useState, useEffect, useRef } from "react";
import NepaliDate from "nepali-date";
import useFestivalStore from "../store/usefestivalStore";
import FestivalsInMonth from "./festivalsInMonth";
import { convertBSToAD, filterFestivalsByMonth, handleDayClick } from "../utili";
import { weekendDays } from "../festivalData";
import PopUpDay from "./PopUpDay";
import Button from "./Button";

const NepaliCalendar = () => {
  const { festivals } = useFestivalStore();
  const [currentDate, setCurrentDate] = useState(new NepaliDate());
  const today = new NepaliDate();
  const [selectedDay, setSelectedDay] = useState(null);
  const popupRef = useRef(null);



  const firstDay = new NepaliDate(
    currentDate.getYear(),
    currentDate.getMonth(),
    1
  );
  const lastDay = new NepaliDate(
    currentDate.getYear(),
    currentDate.getMonth() + 1,
    0
  );
  const daysInMonth = lastDay.getDate();
  const firstDayWeekIndex = firstDay.getDay();

  const nepaliMonth = firstDay.format("MMMM");
  const nepaliYear = firstDay.getYear();
  //convertBSToAD is imported from utili
  const adDate = convertBSToAD(firstDay);
  const [adYear, adMonth] = adDate.split("-");
  const englishMonthName = new Date(adYear, adMonth - 1).toLocaleString(
    "default",
    { month: "long" }
  );

  const prevMonth = () =>
    setCurrentDate(
      new NepaliDate(currentDate.getYear(), currentDate.getMonth() - 1, 1)
    );
  const nextMonth = () =>
    setCurrentDate(
      new NepaliDate(currentDate.getYear(), currentDate.getMonth() + 1, 1)
    );

  const calendarDays = Array(firstDayWeekIndex)
    .fill(null)
    .concat(
      Array.from({ length: daysInMonth }, (_, i) => {
        const nepaliDate = new NepaliDate(
          currentDate.getYear(),
          currentDate.getMonth(),
          i + 1
        );
        return {
          nepaliDate,
          formattedNepaliDate: nepaliDate.format("YYYY-MM-DD"),
          //imported form utili
          englishDate: convertBSToAD(nepaliDate),
        };
      })
    );

  const isToday = (nepaliDate) =>
    nepaliDate.getYear() === today.getYear() &&
    nepaliDate.getMonth() === today.getMonth() &&
    nepaliDate.getDate() === today.getDate();

  const filterFestivalsInMonth = filterFestivalsByMonth(festivals, currentDate);
  return (
    <div className="flex flex-col lg:flex-row w-full sm:p-4 p-0 gap-4">
      {/* Festival List */}
      <div className="bg-white border shadow-md rounded-md p-4 lg:max-w-[350px] w-full lg:w-auto">
        <FestivalsInMonth filterFestivalsInMonth={filterFestivalsInMonth} />
      </div>

      {/* Calendar */}
      <div className="bg-white shadow-md rounded-md p-4 flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          {/* <button
            onClick={prevMonth}
            className="text-lg font-bold px-2 hover:bg-gray-200 rounded-full"
          >
            ⬅
          </button> */}
          <Button onClick={prevMonth} color="white" className="text-lg font-bold px-2 hover:bg-gray-200 rounded-full"> ⬅</Button>
          <h2 className="text-sm sm:text-xl  font-light sm:font-semibold text-center">
            {nepaliMonth} {nepaliYear} | {englishMonthName} {adYear}
          </h2>
          <Button
            onClick={nextMonth}
            color="white" className="text-lg font-bold px-2 hover:bg-gray-200 rounded-full"          >
            ➡
          </Button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center font-sm sm:font-bold">
          {weekendDays.map((day, index) => (
            <div key={index} className="p-2 sm:p-2 flex flex-col items-center">
              <p className="text-sm text-gray-600">{day.en}</p>
              <p className="text-sm">{day.np}</p>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0 sm:gap-1">
          {calendarDays.map((day, i) => {
            if (!day) return <div key={i} className="w-full h-16 border"></div>;

            const festival = festivals.find(
              (f) => f.date === day.formattedNepaliDate
            );
            return (
              <div
                key={i}
                onClick={(e) =>
                  handleDayClick(day, e, festivals, setSelectedDay, popupRef)
                }
                className={`w-full h-16 flex gap-0 flex-col justify-between items-center border  cursor-pointer transition hover:bg-gray-100
                ${isToday(day.nepaliDate)
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                  }`}
              >
                {festival && (
                  <p className="text-red-600 text-[8px] sm:text-[8px] leading-3">{festival.name}</p>
                )}
                <p className=" text-[15px] sm:text-lg font-semibold">
                  {day.nepaliDate.format("DD")}
                </p>
                <p className=" relative bottom-3 text-right right-1 w-full text-[10px] sm:text-sm font-light  text-gray-500">
                  {day.englishDate.split("-")[2]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popup for Festival Details */}
      {selectedDay && (
        <>
          <PopUpDay
            popupRef={popupRef}
            selectedDay={selectedDay}
            handleselectedDay={() => setSelectedDay(null)}
          />
        </>
      )}
    </div>
  );
};

export default NepaliCalendar;
