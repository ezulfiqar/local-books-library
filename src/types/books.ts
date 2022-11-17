import { BookType } from "./book";

export type PaginatedBooksType = {
  count: number;
  next: string;
  previous: string;
  results: BookType[];
};
