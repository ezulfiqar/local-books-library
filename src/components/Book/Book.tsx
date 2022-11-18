import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import { BookType } from "../../types";
import { reserveApi } from "../../api";
import { USER } from "../../constants";

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
  const [duration, setDuration] = useState(1);
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

  const handleReserve = async () => {
    await reserveApi().reserveBook(
      USER,
      book.title,
      book.authors[0].name,
      duration
    );
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
          <Box sx={{ mt: 2 }}>
            <FormControl variant="standard" sx={{ p: "4px" }}>
              <Select
                id="duration"
                value={duration}
                onChange={(event) =>
                  setDuration(parseInt(event.target.value.toString()))
                }
              >
                <MenuItem value={1}>1 Day</MenuItem>
                <MenuItem value={7}>1 Week</MenuItem>
                <MenuItem value={30}>1 Month</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleReserve}
              sx={{ float: "right" }}
            >
              Reserve
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
