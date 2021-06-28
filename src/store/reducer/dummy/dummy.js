import * as actionLabels from '../../actionLabels';

const initialState = {
  action: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionLabels.DUMMY_ACTION_SUCCESS: {
      return {
        ...state,
        action: true,
      };
    }
    default:
      return state;
  }
};
