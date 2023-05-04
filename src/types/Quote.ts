import type Genre from "./Genre";

export default interface Quote {
  id: number;
  text: string;
  author: string;
  genres: Array<Genre>;
  created_at: string;
  updated_at: string;
}