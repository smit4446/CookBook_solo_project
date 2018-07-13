import { put, takeLatest } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';
import axios from 'axios';
import {COOKBOOK_ACTIONS} from '../actions/cookbookActions';
import {getCookbooks} from '../requests/cookbookRequests';


//generator function
function* fetchCookbooks() {
  try {
    let cookbooks = yield getCookbooks();
    console.log('in cookbook saga');
    yield put({
      type: COOKBOOK_ACTIONS.SHOW_COOKBOOKS,
      payload: cookbooks
    });
  } catch (error) {
   console.log('error in cookbook saga', error);
  }
}

function* cookbookSaga() {
  yield takeLatest (COOKBOOK_ACTIONS.FETCH_COOKBOOKS, fetchCookbooks)
}


export default cookbookSaga;
