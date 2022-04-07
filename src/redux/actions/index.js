export const ACTION_LOGIN = 'ACTION_LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const RESPONSE_API = 'RESPONSE_API';
export const SUM_SCORE = 'SUM_SCORE';

export const actionLogin = (payload) => ({
  type: ACTION_LOGIN,
  payload,
});

export const requestApi = () => ({ type: REQUEST_API });

export const responseAPI = (payload) => ({ type: RESPONSE_API, payload });

export function fetchToken() {
  return async (dispatch) => {
    try {
      dispatch(requestApi());
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();
      dispatch(responseAPI(data.token));
    } catch (error) {
      console.log(error);
    }
  };
}

export const actionSumScore = (payload) => ({
  type: SUM_SCORE,
  payload,
});
