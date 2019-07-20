// action types
export const QUIZZES_API_GET_QUIZZES = '[QUIZZES API] GET_QUIZZES';

// action creators
interface getQuizzesAction {
  type: typeof QUIZZES_API_GET_QUIZZES;
  payload: Array<string>;
}
export const getQuizzes = (jsonFilesString: Array<string>): getQuizzesAction => {
  return { type: QUIZZES_API_GET_QUIZZES, payload: jsonFilesString }
};