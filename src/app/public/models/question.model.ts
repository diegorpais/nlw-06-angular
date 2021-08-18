import { Author } from "./author.model";

export interface Question {
  id: string;
  author: Author;
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}
