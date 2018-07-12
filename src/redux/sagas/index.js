import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import cookbookSaga from './cookbookSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    cookbookSaga(),
    // watchIncrementAsync()
  ]);
}
