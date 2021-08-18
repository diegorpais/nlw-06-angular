import { Question } from 'src/app/public/models';
export class RoomInfo {
  authorId: string;
  title: string;
  questions?: Question;
}
