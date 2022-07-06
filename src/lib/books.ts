export interface Book {
  title: string;
  genre: string;
  url: string;
  author: string;
  image: string;
  views: number;
  id: number;
}

export const endpoint = "https://books.deta.dev/";

export const getBooks = (page: number = 1) =>
  fetch(endpoint + `book/top?page=${page}`).then((res) => res.json());

export const logView = (id: number) =>
  fetch(endpoint + `book/log/${id}`, {
    method: "POST",
  });
