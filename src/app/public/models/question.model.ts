import { Author } from "./author.model";

export interface Question {
  id?: string;
  content: string;
  author: Author;
  isHighLighted: boolean;
  isAnswered: boolean;
}
