import React, { useState } from "react";

function BSToADConverter() {
  const [bsYear, setBsYear] = useState(2081);
  const [bsMonth, setBsMonth] = useState(10);
  const [bsDay, setBsDay] = useState(27);
  const [adDate, setAdDate] = useState("");

  // Function to manually convert BS to AD (Approximate calculation)
  const bsToAd = (year, month, day) => {
    // Reference: The BS calendar is approximately 56 years and 8.5 months ahead of AD.
    const baseYearOffset = 56; // Approximate offset (1957 AD ≈ 2000 BS)
    const baseMonthOffset = 8; // Approximate month shift

    let adYear = year - baseYearOffset;
    let adMonth = month - baseMonthOffset;
    let adDay = day; // Days are mostly the same in both calendars

    // Adjust for negative months (shift year and month accordingly)
    if (adMonth <= 0) {
      adYear -= 1;
      adMonth += 12;
    }

    // Format result properly
    return `${adYear}-${String(adMonth).padStart(2, "0")}-${String(
      adDay
    ).padStart(2, "0")}`;
  };

  const handleConvert = () => {
    try {
      const result = bsToAd(bsYear, bsMonth, bsDay);
      setAdDate(result);
    } catch (error) {
      console.error("Conversion error:", error);
      setAdDate("Invalid Date");
    }
  };

  return (
    <div className="container">
      <h1>BS to AD Converter (Without Package)</h1>

      <div>
        <label>BS Year:</label>
        <input
          type="number"
          value={bsYear}
          onChange={(e) => setBsYear(parseInt(e.target.value) || 2080)}
        />
      </div>

      <div>
        <label>BS Month:</label>
        <input
          type="number"
          value={bsMonth}
          onChange={(e) => setBsMonth(parseInt(e.target.value) || 1)}
        />
      </div>

      <div>
        <label>BS Day:</label>
        <input
          type="number"
          value={bsDay}
          onChange={(e) => setBsDay(parseInt(e.target.value) || 1)}
        />
      </div>

      <button onClick={handleConvert}>Convert to AD</button>

      {adDate && (
        <div>
          <h2>Converted AD Date:</h2>
          <p>{adDate}</p>
        </div>
      )}
    </div>
  );
}

export default BSToADConverter;
