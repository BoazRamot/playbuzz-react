// action types

export const ADVANCE_SCORE = 'ADVANCE_SCORE';
export const RESET_SCORE = 'RESET_SCORE';

// action creators

export const scoreSum = (answerValue: number) => {
  return { type: ADVANCE_SCORE, payload: answerValue }
};

export const restartScore = () => {
  return { type: RESET_SCORE }
};