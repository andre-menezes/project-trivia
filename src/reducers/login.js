import { ADD_PLAYER } from '../actions';

const INITIAL_STATE = { player: {} };

export default function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_PLAYER: return { ...state, player: action.player };
  default: return state;
  }
}
