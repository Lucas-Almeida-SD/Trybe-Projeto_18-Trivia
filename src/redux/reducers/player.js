import { ACTION_LOGIN, RESPONSE_API } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
  token: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESPONSE_API:
    return { ...state, token: action.payload };
  case ACTION_LOGIN:
    return { ...state, name: action.payload.name, gravatarEmail: action.payload.email };
  default:
    return state;
  }
};

export default player;
