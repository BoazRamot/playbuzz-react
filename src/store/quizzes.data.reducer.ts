import {Quiz} from '../models/Quiz';

const QUIZZES_DATA_SET = '[QUIZZES] DATA_SET';

// actions types
interface quizSetAllAction {
  // type: typeof QUIZZES_DATA_SET;
  type: typeof QUIZZES_DATA_SET;
  payload: Quiz;
}

type quizzesDataActionTypes = quizSetAllAction

// actions factories
export const quizzesDataSet = (payload: Quiz): quizzesDataActionTypes => {
  return {
    type: QUIZZES_DATA_SET,
    payload
  }
};

const quizzesDataReducer = (state: Array<Quiz> = [], action: any) => {
  switch (action.type) {
    case QUIZZES_DATA_SET:
      return [...state, action.payload];

    case 'SET_SHUFFLED_QUESTIONS':
      return state.map((item) => {
        if (item.id !== action.payload.id) {
          return item;
        } else {
          return {
            ...item, questions: action.payload.questions
          }
        }
      });

    default:
      return state;
  }
};

export default quizzesDataReducer;
