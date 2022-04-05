import { RESPONSE_API } from '../actions';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESPONSE_API:
    return action.payload;
  default:
    return state;
  }
};

export default token;
