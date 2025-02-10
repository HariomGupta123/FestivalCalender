import React from 'react'

const FestivalsInMonth = ({ filterFestivalsInMonth }) => {
  return (
    <>
      <h3 className="text-xl font-semibold text-center mb-3">
        Festivals This Month
      </h3>
      <div className="max-h-[60vh] overflow-y-auto">
        {filterFestivalsInMonth.length === 0 ? (
          <p className="text-center text-gray-600">No festivals this month</p>
        ) : (
          filterFestivalsInMonth.map((festival) => (
            <div key={festival.date} className="border-b py-2">
              <h4 className="font-semibold">{festival.name}</h4>
              <p className="text-sm text-gray-500">{festival.date}</p>
              <p className="text-sm">{festival.description}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default FestivalsInMonth
