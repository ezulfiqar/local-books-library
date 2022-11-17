import axios from "axios";
import { PaginatedBooksType } from "../types";
import { API_URL } from "../constants";

export const booksApi = () => {
  return {
    fetchBooks,
    searchBooks,
  };
};

const fetchBooks = async (page: number = 1): Promise<PaginatedBooksType> => {
  let paginatedBooks: PaginatedBooksType = {
    count: 0,
    next: "",
    previous: "",
    results: [],
  };

  try {
    const response = await axios.get(`${API_URL}/books?page=${page}`);
    paginatedBooks = response.data;
  } catch (e) {
    console.error(e);
  }

  return paginatedBooks;
};

const searchBooks = async (
  search: string,
  page: number = 1
): Promise<PaginatedBooksType> => {
  let paginatedBooks: PaginatedBooksType = {
    count: 0,
    next: "",
    previous: "",
    results: [],
  };

  try {
    const response = await axios.get(
      `${API_URL}/books?search=${search}&page=${page}`
    );
    paginatedBooks = response.data;
  } catch (e) {
    console.error(e);
  }

  return paginatedBooks;
};
