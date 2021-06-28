import * as actionLabels from '../../actionLabels';

export const dummyAction = () => {
  return {
    type: actionLabels.DUMMY_ACTION_SAGA,
  };
};
export const dummyActionSuccess = () => {
  return {
    type: actionLabels.DUMMY_ACTION_SUCCESS,
  };
};
