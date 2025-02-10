import useFestivalStore from "./store/usefestivalStore";
import FestivalSearch from "./Component/search";
import FestivalCalendar from "./Component/FestevalCalendar";
import FestivalList from "./Component/FestivalList";
import TodoApp from "./todo/TaskManager";

function App() {
  const { searchQuery } = useFestivalStore(); // Get searchQuery from store

  return (
    <div className="flex flex-col justify-center items-center w-full mx-auto p-4 bg-amber-400">
      <h1 className="text-2xl font-bold mb-4">Nepali Festivals Calendar</h1>
      <FestivalSearch />

      <div className="w-full flex flex-col lg:flex-row gap-6">
      {/* festivallist appear when searching  */}
        {searchQuery && <FestivalList />}
        <FestivalCalendar />
        <TodoApp />
      </div>
    </div>
  );
}

export default App;
