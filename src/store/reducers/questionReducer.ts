import {Action} from "../configureStore";
import {
  ADVANCE_QUESTION,
  RESET_QUESTION_INDEX,
  SET_LAST_INDEX,
  SET_QUESTION_SHUFFLE
} from "../actions/action.questionReducer";

const questionsInitState = {
  questionIndex: 0,
  lastIndex: false,
  shuffled: false,
};

const questionReducer = (state = questionsInitState, action: Action) => {
  switch (action.type) {
    case ADVANCE_QUESTION:
      return {
        ...state,
        questionIndex: state.questionIndex + 1
      };

    case SET_LAST_INDEX:
      return {
        ...state,
        lastIndex: true
      };

    case SET_QUESTION_SHUFFLE:
      return {
        ...state,
        shuffled: action.payload
      };

    case RESET_QUESTION_INDEX:
      return {...questionsInitState};

    default:
      return state;
  }
};

export default questionReducer;