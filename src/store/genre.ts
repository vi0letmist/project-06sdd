import { create } from "zustand";
import axios from "axios";

interface GenreStore {
  genreList: Genre[] | null;
  loading: boolean;
  error: string | null;
  setGenreList: (genrelist: Genre[]) => void;
  getGenreList: () => Promise<void>;
}

const url = process.env.NEXT_PUBLIC_API_URL;

export const useGenreStore = create<GenreStore>((set) => ({
  genreList: null,
  loading: false,
  error: null,
  setGenreList: (genreList: Genre[]) => set({ genreList }),

  getGenreList: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${url}/genres/`);
      set({ genreList: response.data.data, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },
}));
