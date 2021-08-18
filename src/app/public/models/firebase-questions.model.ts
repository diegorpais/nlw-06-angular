import { Author } from "./author.model";

export interface FirebaseQuestions {
  author: Author;
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
  likes?: {
    authorId: string;
  }
}
