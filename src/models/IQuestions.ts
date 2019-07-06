import {IOptions} from "./IOptions";

export interface IQuestions {
  id: string;
  imgSrc: string;
  question: string;
  options: Array<IOptions>;
}