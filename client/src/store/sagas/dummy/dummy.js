/* eslint-disable import/prefer-default-export */
import { all, takeEvery, put, call } from 'redux-saga/effects';
import { dummyActionSuccess } from '../../actions';
import * as actionLabels from '../../actionLabels';

// eslint-disable-next-line no-unused-vars
function* dummyActionSaga(action) {
  yield call([localStorage, 'setItem'], 'dummyAction', 'Succeeded');
  yield put(dummyActionSuccess());
}

export default function* rootsaga() {
  yield all([yield takeEvery(actionLabels.DUMMY_ACTION_SAGA, dummyActionSaga)]);
}
