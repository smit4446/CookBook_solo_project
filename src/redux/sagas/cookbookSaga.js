import { put, takeLatest } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';
import axios from 'axios';
import {COOKBOOK_ACTIONS} from '../actions/cookbookActions';
import {getCookbooks} from '../requests/cookbookRequests';
// import {postCookbook} from '../requests/cookbookRequests';


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

// function* createCookbook() {
//   try {
//     let cookbook = yield postCookbook();
//     console.log('in cookbook saga');
//     yield put({
//       type: COOKBOOK_ACTIONS.POST_COOKBOOK,
//       payload: cookbook
//     });
//   } catch (error) {
//    console.log('error in cookbook saga', error);
//   }
// }

function* cookbookSaga() {
  yield takeLatest (COOKBOOK_ACTIONS.FETCH_COOKBOOKS, fetchCookbooks)
  // yield takeLatest (COOKBOOK_ACTIONS.POST_COOKBOOK, createCookbook)
}


export default cookbookSaga;
