import {applyMiddleware, combineReducers, createStore} from 'redux'
import quizzesDataReducer from './reducers/quizzes.data.reducer';
import {quizzesMdl} from './quizzes.api.middleware';
import {Quiz} from "../models/Quiz";
import {loadState} from "./localStorage";
import scoreReducer from "./reducers/scoreReducer";
import questionReducer from "./reducers/questionReducer";

export interface Action {
  type: any;
  payload: any;
}

export interface IRootState {
  questionIndex: IQuestions;
  score: IScore;
  quizzes: Array<Quiz>;
}

interface IQuestions {
  questionIndex: number;
  lastIndex: boolean;
  shuffled: boolean;
}

interface IScore {
  score: number;
}

export default function configureStore() {
  const middlewareEnhancer = applyMiddleware(quizzesMdl);
  const persistedState = loadState();

  const rootReducer = combineReducers({
    questionIndex: questionReducer,
    score: scoreReducer,
    quizzes: quizzesDataReducer,
  });

  return createStore(rootReducer, persistedState, middlewareEnhancer)
}