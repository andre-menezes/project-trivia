import { RECEIVE_QUESTIONS } from '../actions';

const INITIAL_STATE = { questions: [], isFetching: true };

export default function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case RECEIVE_QUESTIONS: return {
    ...state,
    questions: action.questions,
    isFetching: false,
  };
  default: return state;
  }
}
