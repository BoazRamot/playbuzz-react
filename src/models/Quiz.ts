import {IResult} from "./IResult";
import {IQuestions} from "./IQuestions";

export class Quiz {
  public id: string;
  public imgSrc: string;
  public title: string;
  public result: Array<IResult>;
  public questions: Array<IQuestions>;

  constructor(spec: any) {
    this.id = spec.id;
    this.imgSrc = spec.imgSrc;
    this.title = spec.title;
    this.result = spec.result;
    this.questions = spec.questions;
  }
}