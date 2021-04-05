import { combineReducers } from 'redux';

import dummyReducer from './dummy/dummy';

const allReducers = combineReducers({
  dummyReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }
  return allReducers(state, action);
};

export default rootReducer;
