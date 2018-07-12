import { put, takeLatest, call } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';
import axios from 'axios';


function* cookbookSaga() {
  try {
    yield call (axios.get, '/main')
  } catch (error) {
   console.log('error in saga', error);
  }
}


export default cookbookSaga;
