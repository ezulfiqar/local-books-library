import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Paper, InputBase, IconButton } from "@mui/material";

type SearchPropsType = {
  search: string;
  setSearch: (value: string) => void;
};

export const Search = ({ search, setSearch }: SearchPropsType) => {
  const [value, setValue] = useState(search);

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, p: "2px 4px" }}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
      <IconButton
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={() => setSearch(value)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
