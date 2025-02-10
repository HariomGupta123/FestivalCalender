import Button from "./Button";

const PopUpDay = ({popupRef,selectedDay,handleselectedDay}) => {
  return (
    <div
      ref={popupRef}
      className="fixed bg-white p-4 rounded-md shadow-lg max-w-md w-full left-1/2 top-1/3 transform -translate-x-1/2 z-10"
    >
      <h3 className="text-xl font-semibold">{selectedDay.name}</h3>
      <p className="mt-2">Festival Date: {selectedDay.date}</p>
      <p className="mt-2">{selectedDay.description}</p>
      <Button
        onClick={handleselectedDay}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Close
      </Button>
    </div>
  );
}

export default PopUpDay
