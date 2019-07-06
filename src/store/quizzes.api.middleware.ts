import {Dispatch, Middleware, MiddlewareAPI} from 'redux';
import {Quiz} from '../models/Quiz';
import {quizzesDataSet} from './quizzes.data.reducer';
import {IQuiz} from "../models/IQuiz";

const QUIZZES_API_GET_QUIZZES = '[QUIZZES API] GET_QUIZZES';

// actions types
interface getQuizzesAction {
  type: typeof QUIZZES_API_GET_QUIZZES;
  payload: Array<string>;
}

// actions factories
export const getQuizzes = (jsonFilesString: Array<string>): getQuizzesAction => {
  return {
    type: QUIZZES_API_GET_QUIZZES,
    payload: jsonFilesString
  }
};

// see: https://stackoverflow.com/questions/45339448/how-do-you-create-strongly-typed-redux-middleware-in-typescript-from-reduxs-typ
const getQuizzesFlow:Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
  if (action.type === QUIZZES_API_GET_QUIZZES) {
    // see: https://facebook.github.io/create-react-app/docs/deployment#github-pages-https-pagesgithubcom
    // https://facebook.github.io/create-react-app/docs/using-the-public-folder
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
