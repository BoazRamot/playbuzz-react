// action types

export const ADVANCE_QUESTION = 'ADVANCE_QUESTION';
export const SET_LAST_INDEX = 'SET_LAST_INDEX';
export const SET_QUESTION_SHUFFLE = 'SET_QUESTION_SHUFFLE';
export const RESET_QUESTION_INDEX = 'RESET_QUESTION_INDEX';

// action creators

export const nextQuestion = () => {
  return { type: ADVANCE_QUESTION }
};

export const lastQuestion = () => {
  return { type: SET_LAST_INDEX }
};

export const shuffleQuestion = (isShuffled: boolean) => {
  return { type: SET_QUESTION_SHUFFLE, payload: isShuffled }
};

export const restartQuestion = () => {
  return { type: RESET_QUESTION_INDEX }
};