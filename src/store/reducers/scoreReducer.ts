import {Action} from "../configureStore";
import {ADVANCE_SCORE, RESET_SCORE} from "../actions/action.scoreReducer";

const scoresInitState = {
  score: 0,
};

const scoreReducer = (state = scoresInitState, action: Action) => {
  switch (action.type) {

    case ADVANCE_SCORE:
      return {
        ...state,
        score: state.score + action.payload
      };

    case RESET_SCORE:
      return {...scoresInitState};

    default:
      return state;
  }
};

export default scoreReducer;