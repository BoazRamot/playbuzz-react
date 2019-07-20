import {Quiz} from "../../models/Quiz";

// action types
export const QUIZZES_DATA_SET = '[QUIZZES] DATA_SET';
export const SET_SHUFFLED_QUESTIONS = 'SET_SHUFFLED_QUESTIONS';

// action creators
interface quizSetAllAction {
  type: typeof QUIZZES_DATA_SET;
  payload: Quiz;
}

type quizzesDataActionTypes = quizSetAllAction

export const quizzesDataSet = (payload: Quiz): quizzesDataActionTypes => {
  return { type: QUIZZES_DATA_SET, payload }
};

export const quizShuffleQuestion = (payload: Quiz) => {
  return { type: SET_SHUFFLED_QUESTIONS, payload: payload }
};