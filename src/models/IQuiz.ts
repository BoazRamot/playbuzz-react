import {IResult} from "./IResult";
import {IQuestions} from "./IQuestions";

export interface IQuiz {
  arrayId: number;
  id: string;
  imgSrc: string;
  title: string;
  result: Array<IResult>;
  questions: Array<IQuestions>;
}