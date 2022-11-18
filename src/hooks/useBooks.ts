import { useEffect, useState } from "react";
import { BookType } from "../types";
import { booksApi } from "../api/books";

export type UseBooksPropsType = {
  page: number;
  search?: string;
  sort: string;
};

export type UseBooksReturnType = {
  books: BookType[];
  isLastPage: boolean;
  isLoading: boolean;
  hasLoaded: boolean;
  totalItems: number;
  totalPages: number;
};

export const useBooks = ({
  page,
  search,
  sort,
}: UseBooksPropsType): UseBooksReturnType => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setBooks([]);
    setIsLastPage(false);
    setIsLoading(true);
    setHasLoaded(false);
    setTotalItems(0);
  }, [page, search, sort]);

  useEffect(() => {
    let isCancelled = false;

    // Skip the iteration when data isn't loading
    if (!isLoading) return () => undefined;

    (async () => {
      try {
        const response = await booksApi().fetchBooks(page, search, sort);

        if (isCancelled) {
          return;
        }

        setIsLastPage(response.next === null);
        setBooks(response.results);

        setTotalPages(Math.ceil(response.count / 32));
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
  }, [isLoading, page, search, sort]);

  return {
    books,
    isLastPage,
    isLoading,
    hasLoaded,
    totalItems,
    totalPages,
  };
};
