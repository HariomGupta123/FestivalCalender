import { create } from "zustand";
import { festivals } from "../festivalData";

const useFestivalStore = create((set, get) => ({
  view: "list", 
  searchQuery: "",
  selectedMonth: "", 
  festivals,
  todos: [],

  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  toggleCompleted: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),

  setView: (view) => set({ view }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedMonth: (month) => set({ selectedMonth: month }),

  filteredFestivals: () => {
    const { festivals, searchQuery, selectedMonth } = get();
    return festivals.filter((festival) => {
      const matchesSearch = festival.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesMonth = selectedMonth
        ? festival.date.includes(selectedMonth)
        : true;
      return matchesSearch && matchesMonth;
    });
  },
}));

export default useFestivalStore;
