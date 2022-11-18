import React, { useState } from "react";
import {
  AppBar,
  Drawer,
  IconButton,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import CollectionsBookmark from "@mui/icons-material/CollectionsBookmark";
import { USER } from "../../constants";
import { BookType } from "../../types";
import { Book } from "../Book";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const shortlist: BookType[] = localStorage.shortlist
    ? JSON.parse(localStorage.shortlist)
    : [];

  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Local Books Library
        </Typography>
        <Typography>Logged in as {USER}</Typography>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="shortlist"
          sx={{ ml: 1 }}
          title="Shortlist"
          onClick={() => setIsOpen(true)}
        >
          <CollectionsBookmark />
        </IconButton>
      </Toolbar>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{ "& > .MuiPaper-root": { width: "33%", p: 2 } }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center" }}>
          Shortlisted Books
        </Typography>
        <Grid container spacing={2} paddingY={2}>
          {shortlist.map((book) => (
            <Grid item xs={12} key={`${book.id}_shortlist`}>
              <Book book={book} variant="shortlist" />
            </Grid>
          ))}
        </Grid>
      </Drawer>
    </AppBar>
  );
};
