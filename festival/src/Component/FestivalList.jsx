import useFestivalStore from "../store/usefestivalStore";

const FestivalList = () => {
  const { filteredFestivals } = useFestivalStore();
  const festivals = filteredFestivals(); 

  return (
    <div className="sm:w-[500px] w-[345px] z-20 absolute top-28 left-1/2 transform -translate-x-1/2 rounded-md bg-amber-900 shadow-lg">
      {festivals.length === 0 ? (
        <p className="text-center p-4 text-white">No festivals found.</p>
      ) : (
        <ul className="list-disc p-4">
          {festivals.map((festival) => (
            <li key={festival.id} className="px-4 py-2 border-b text-white">
              <strong>{festival.name}</strong> - {festival.date}
              <p className="text-sm">{festival.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FestivalList;
