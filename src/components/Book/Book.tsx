import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import { BookType } from "../../types";

const StyledTypography = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

type BookPropsType = {
  book: BookType;
  variant?: "standard" | "shortlist";
};

export const Book = ({ book, variant = "standard" }: BookPropsType) => {
  const bookImage = book.formats["image/jpeg"];
  const initialShortlist: BookType[] = localStorage.shortlist
    ? JSON.parse(localStorage.shortlist)
    : [];
  const [isShortlisted, setIsShortlisted] = useState(
    Boolean(initialShortlist.find((x) => x.id === book.id))
  );

  const handleShortlist = () => {
    const shortlist: BookType[] = localStorage.shortlist
      ? JSON.parse(localStorage.shortlist)
      : [];

    shortlist.push(book);
    localStorage.shortlist = JSON.stringify(shortlist);
    setIsShortlisted(true);
  };

  return (
    <Card>
      {bookImage && (
        <CardMedia
          alt="book cover"
          component="img"
          image={bookImage}
          height={variant === "standard" ? 400 : 70}
        />
      )}
      <CardContent>
        <StyledTypography title={book.title} variant="h6">
          {book.title}
        </StyledTypography>
        <Typography>
          {book.authors.map((author) => author.name).join(" - ")}
        </Typography>
        {variant === "standard" ? (
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            fullWidth
            onClick={handleShortlist}
            disabled={isShortlisted}
          >
            {isShortlisted ? "Shortlisted" : "Shortlist"}
          </Button>
        ) : (
          <Button sx={{ mt: 2 }} variant="contained" fullWidth>
            Reserve
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
