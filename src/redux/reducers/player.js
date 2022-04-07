import { ACTION_LOGIN, SUM_SCORE } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_LOGIN:
    return { ...state, name: action.payload.name, gravatarEmail: action.payload.email };
  case SUM_SCORE:
    return { ...state, score: state.score + action.payload };
  default:
    return state;
  }
};

export default player;
