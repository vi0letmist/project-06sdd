import { create } from "zustand";
import axios from "axios";

interface BookStore {
  bookList: Book[] | null;
  book: Book | null;
  loading: boolean;
  error: string | null;
  setBookList: (booklist: Book[]) => void;
  setBook: (book: Book) => void;
  getBookList: (params: any) => Promise<void>;
  getBookById: (id: string) => Promise<void>;
  createBook: (formData: FormData) => Promise<void>;
}

const url = process.env.NEXT_PUBLIC_API_URL;

export const useBookStore = create<BookStore>((set) => ({
  bookList: null,
  book: null,
  loading: false,
  error: null,
  setBookList: (bookList: Book[]) => set({ bookList }),
  setBook: (book: Book) => set({ book }),

  getBookList: async (params: any) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${url}/books/`, { params });
      set({ bookList: response.data.data.data, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },

  getBookById: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get(`${url}/books/${id}`);
      set({ book: response.data.data, loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },

  createBook: async (formData: FormData) => {
    try {
      set({ loading: true, error: null });
      await axios.post(`${url}/books/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set({ loading: false });
    } catch (error: any) {
      set({ loading: false, error: error.message });
    }
  },
}));
