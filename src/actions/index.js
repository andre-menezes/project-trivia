import { getQuestionsApi } from '../services';

export const ADD_PLAYER = 'ADD_PLAYER';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const STOP_TIMER = 'STOP_TIMER';

export const addPlayer = (player) => ({ type: ADD_PLAYER, player });

export const receiveQuestions = (questions) => ({ type: RECEIVE_QUESTIONS, questions });

export const stopTimer = (isResponding) => ({ type: STOP_TIMER, isResponding });

export function fetchQuestions() {
  return async (dispatch) => {
    const result = await getQuestionsApi();
    dispatch(receiveQuestions(result));
  };
}
