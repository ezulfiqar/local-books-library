import React from "react";
import {
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
};

export const Book = ({ book }: BookPropsType) => {
  const bookImage = book.formats["image/jpeg"];
  return (
    <Card>
      {bookImage && (
        <CardMedia
          alt="book cover"
          component="img"
          image={bookImage}
          height={400}
        />
      )}
      <CardContent>
        <StyledTypography title={book.title} variant="h6">
          {book.title}
        </StyledTypography>
      </CardContent>
    </Card>
  );
};
