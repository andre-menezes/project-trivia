import { RECEIVE_QUESTIONS, STOP_TIMER } from '../actions';

const INITIAL_STATE = {
  questions: [],
  isFetching: true,
  isResponding: false,
};

export default function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVE_QUESTIONS: return {
    ...state,
    questions: action.questions,
    isFetching: false,
    isResponding: true,
  };
  case STOP_TIMER: return { ...state, isResponding: action.isResponding };
  default: return state;
  }
}
