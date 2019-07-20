import {Quiz} from '../../models/Quiz';
import {QUIZZES_DATA_SET, SET_SHUFFLED_QUESTIONS} from "../actions/action.quizzesDataReducer";

const quizzesDataReducer = (state: Array<Quiz> = [], action: any) => {
  switch (action.type) {
    case QUIZZES_DATA_SET:
      return [...state, action.payload];

    case SET_SHUFFLED_QUESTIONS:
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
