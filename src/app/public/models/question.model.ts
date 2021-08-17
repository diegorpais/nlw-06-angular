import { Author } from "./author.model";

export interface Question {
  content: string;
  author: Author;
  isHighLighted: boolean;
  isAnswered: boolean;
}
