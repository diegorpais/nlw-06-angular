import { Author, FirebaseAnswers } from 'src/app/public/models';
export interface Question {
  id: string;
  author: Author;
  content: string;
  answer: FirebaseAnswers;
  isAnswered: boolean;
  isHighLighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}
