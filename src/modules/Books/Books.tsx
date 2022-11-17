import React from "react";
import { Button } from "@mui/material";
import { Search } from "../../components/Search";
import { useBooks } from "../../hooks";

export const Books = () => {
  const { books, isLoading, loadNextPage } = useBooks({});

  console.log("books", isLoading, books);
  return (
    <div>
      <Search />
      <Button onClick={() => loadNextPage()}>Next Page</Button>
      Books will be displayed here.
    </div>
  );
};
