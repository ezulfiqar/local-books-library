import { AuthorType } from "./author";

export type BookType = {
  id: number;
  title: string;
  authors: AuthorType[];
  translators: AuthorType[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: Record<string, string>;
  download_count: number;
};
