import useFestivalStore from "../store/usefestivalStore";

const FestivalSearch = () => {
  const { searchQuery, setSearchQuery } = useFestivalStore();

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search festivals..."
      className="p-1 border rounded sm:w-[500px] w-[300px]"
    />
  );
};

export default FestivalSearch;
