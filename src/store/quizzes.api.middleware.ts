import {Dispatch, Middleware, MiddlewareAPI} from 'redux';
import {Quiz} from '../models/Quiz';
import {IQuiz} from "../models/IQuiz";
import {QUIZZES_API_GET_QUIZZES} from "./actions/action.quizzesApiMD";
import {quizzesDataSet} from "./actions/action.quizzesDataReducer";

const getQuizzesFlow: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
  if (action.type === QUIZZES_API_GET_QUIZZES) {
    action.payload.forEach((item: string) => {
      fetch(process.env.PUBLIC_URL + item)
        .then(res => res.json())
        .then((data: IQuiz) => {
          const quiz = new Quiz(data);
          dispatch(quizzesDataSet(quiz));
        })
        .catch((e) => {
          console.error('Quizzes Fetch failed', e)
        })
    });
  }
  return next(action);
};

export const quizzesMdl = getQuizzesFlow;
