import { useEffect, useState } from "react";
import axios from "axios";
import { BOOKS_API_URL } from "../constants";
import { BookType } from "../types";

export type UseBooksPropsType = {
  // page?: number;
  search?: string;
};

export type UseBooksReturnType = {
  books: BookType[];
  isLastPage: boolean;
  isLoading: boolean;
  hasLoaded: boolean;
  totalItems: number;
  loadNextPage: () => void;
};

export const useBooks = ({ search }: UseBooksPropsType): UseBooksReturnType => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [nextPage, setNextPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const loadNextPage = (): void => {
    if (isLoading || isLastPage) return;
    setIsLoading(true);
  };

  useEffect(() => {
    setBooks([]);
    setIsLastPage(false);
    setIsLoading(true);
    setHasLoaded(false);
    setTotalItems(0);
    setNextPage(0);
  }, [search]);

  useEffect(() => {
    let isCancelled = false;

    // Skip the iteration when data isn't loading
    if (!isLoading) return () => undefined;

    (async () => {
      try {
        const response = await (await axios.get(`${BOOKS_API_URL}/books`)).data;

        if (isCancelled) {
          return;
        }

        console.log("nextPage", nextPage);

        setIsLastPage(response.next === null);
        setBooks(response.results);

        setNextPage((currentPage) => currentPage + 1);
        setTotalItems(response.count);
        setHasLoaded(true);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [isLoading, nextPage]);

  return {
    books,
    isLastPage,
    isLoading,
    hasLoaded,
    totalItems,
    loadNextPage,
  };
};
