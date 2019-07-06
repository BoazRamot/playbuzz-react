import {applyMiddleware, combineReducers, createStore} from 'redux'
import quizzesDataReducer from './quizzes.data.reducer';
import {quizzesMdl} from './quizzes.api.middleware';
import {Quiz} from "../models/Quiz";
import {loadState} from "./localStorage";

export interface IRootState {
  questionIndex: IQuestions;
  score: IScore;
  quizzes: Array<Quiz>;
}

interface Action {
  type: string;
  payload: any;
}

interface IQuestions {
  questionIndex: number;
  lastIndex: boolean;
  shuffled: boolean;
}

const questionsInitState = {
  questionIndex: 0,
  lastIndex: false,
  shuffled: false,
};

const questionReducer = (state = questionsInitState, action: Action) => {
  switch (action.type) {
    case 'ADVANCE_QUESTION':
      return {
        ...state,
        questionIndex: state.questionIndex + 1
      };

    case 'SET_LAST_INDEX':
      return {
        ...state,
        lastIndex: true
      };

    case 'SET_QUESTION_SHUFFLE':
      return {
        ...state,
        shuffled: action.payload
      };

    case 'RESET_QUESTION_INDEX':
      return {...questionsInitState};

    default:
      return state;
  }
};

interface IScore {
  score: number;
}

const scoresInitState = {
  score: 0,
};

const scoreReducer = (state = scoresInitState, action: Action) => {
  switch (action.type) {

    case 'ADVANCE_SCORE':
      return {
        ...state,
        score: state.score + action.payload
      };

    case 'RESET_SCORE':
      return {...scoresInitState};

    default:
      return state;
  }
};

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