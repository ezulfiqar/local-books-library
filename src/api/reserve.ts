import axios from "axios";
// import { PaginatedBooksType } from "../types";
import { API_URL } from "../constants";

export const reserveApi = () => {
  return {
    reserveBook,
  };
};

const reserveBook = async (
  username: string,
  title: string,
  author: string,
  duration: number // days
): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/reserve`, {
      data: { book: { username, title, author }, duration },
    });
    console.log("api", response);

    return response;
  } catch (e) {
    console.error(e);
  }

  return;
};
