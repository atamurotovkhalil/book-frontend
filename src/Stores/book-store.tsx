import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Book } from "../Types/book";

interface BookStore {
  CurrentBook: null;
  AllBooks: any;
  getCurrentBook: (id: string) => Promise<void>;
  getAllBooks: (keyword: string, searchterm: any) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
}

export const useBookStore = create<BookStore>()(
  devtools((set) => ({
    CurrentBook: {},
    AllBooks: [],
    getAllBooks: async (keyword: string, searchterm: any) => {
      try {
        let url = "http://localhost:3000/api/books";
        if (keyword) {
          url += `?${keyword}=${encodeURI(searchterm)}`;
        }
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to get data ${response.statusText}`);
        }

        const data = await response.json();
        set({ AllBooks: data });
      } catch (error) {
        console.log(`Failed ${error}`);
      }
    },

    getCurrentBook: async (id: string) => {
      try {
        const response = await fetch(`http://localhost:3000/api/books/${id}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`Failed to get data ${response.statusText}`);
        }

        const data = await response.json();
        set({ CurrentBook: data });
      } catch (error) {
        console.log(`Failed ${error}`);
      }
    },
  }))
);
