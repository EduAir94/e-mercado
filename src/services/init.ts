import store from '../store';
import { JSONResult } from '../types';

/* eslint-disable no-unused-vars */
const showSpinner = () => {
  store.dispatch({
    type: 'spinner/show',
  });
};

const hideSpinner = () => {
  store.dispatch({
    type: 'spinner/hide',
  });
};

// eslint-disable-next-line no-unused-vars
const getJSONData = (url: string, disable_spinner = false) => {
  const result: JSONResult = { status: 'ok', data: null };
  if (!disable_spinner) showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw Error(response.statusText);
    })
    .then((response) => {
      result.status = 'ok';
      result.data = response;
      if (!disable_spinner) hideSpinner();
      return result;
    })
    .catch((error) => {
      result.status = 'error';
      result.data = error;
      if (!disable_spinner) hideSpinner();
      return result;
    });
};

export { getJSONData, showSpinner, hideSpinner };
