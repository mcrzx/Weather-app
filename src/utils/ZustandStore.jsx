import { create } from "zustand";

// create a store to hold city array
export const useCityStore = create((set) => ({
    cities: [],
    addCity: (city) => set((state) => ({ cities: [...state.cities, city] })),
    removeCity: (city) => set((state) => ({ cities: state.cities.filter((c) => c.id !== city.id) })),
}));

export const useFavouriteCityStore = create((set) => ({
    favouriteCities: [],
    addFavouriteCity: (city) =>
      set((state) => ({ favouriteCities: [...state.favouriteCities, city] })),
    removeFavouriteCity: (city) =>
      set((state) => ({
        favouriteCities: state.favouriteCities.filter((c) => c !== city),
      })),
  }));
  
  export const useRemoveFavouriteCity = () => {
    const { removeFavouriteCity } = useFavouriteCityStore();
    return removeFavouriteCity;
  };



//get the favourite cities from the store
export const useFavouriteCities = () => {
    const { favouriteCities } = useFavouriteCityStore();
    return favouriteCities;
}


