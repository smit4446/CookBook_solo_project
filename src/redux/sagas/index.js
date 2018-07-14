import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import cookbookSaga from './cookbookSaga';
import categorySaga from './categorySaga';
import recipeSaga from './recipeSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    cookbookSaga(),
    categorySaga(),
    recipeSaga()
    // watchIncrementAsync()
  ]);
}
