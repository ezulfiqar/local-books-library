import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  Pagination,
  MenuItem,
  Select,
} from "@mui/material";
import { Book, Search } from "../../components";
import { useBooks } from "../../hooks";

export const Books = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const { books, totalPages } = useBooks({ page, search, sort });

  useEffect(() => {
    setPage(1);
    setSort("popular");
  }, [search]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  return (
    <Box>
      <Search search={search} setSearch={setSearch} />
      <FormControl sx={{ float: "right", mt: 2, width: "150px" }}>
        <InputLabel id="sort-label">Sort</InputLabel>
        <Select
          id="sort"
          labelId="sort-label"
          label="Sort"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <MenuItem value="popular">Popular</MenuItem>
          <MenuItem value="ascending">Ascending</MenuItem>
          <MenuItem value="descending">Descending</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2} paddingY={2}>
        {books.map((book) => (
          <Grid item md={4} sm={6} xs={12} key={book.id}>
            <Book book={book} />
          </Grid>
        ))}
      </Grid>
      <Pagination count={totalPages} page={page} onChange={handlePageChange} />
    </Box>
  );
};
