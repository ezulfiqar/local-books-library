import axios from "axios";
import { PaginatedBooksType } from "../types";
import { BOOKS_API_URL } from "../constants";

export const booksApi = () => {
  return {
    fetchBooks,
  };
};

const fetchBooks = async (
  page: number = 1,
  search?: string,
  sort?: string
): Promise<PaginatedBooksType> => {
  let paginatedBooks: PaginatedBooksType = {
    count: 0,
    next: "",
    previous: "",
    results: [],
  };

  try {
    const response = await axios.get(`${BOOKS_API_URL}/books`, {
      params: { page, search, sort },
    });
    paginatedBooks = response.data;
  } catch (e) {
    console.error(e);
  }

  return paginatedBooks;
};
