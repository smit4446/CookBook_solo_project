import { put, takeLatest } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';
import {COOKBOOK_ACTIONS} from '../actions/cookbookActions';
import {getCategories} from '../requests/cookbookRequests';


//generator function
function* fetchCategories() {
  try {
    let categories = yield getCategories();
    console.log('in category saga', categories);
    yield put({
      type: COOKBOOK_ACTIONS.SHOW_CATEGORIES,
      payload: categories
    });
  } catch (error) {
   console.log('error in cookbook saga', error);
  }
}

function* categorySaga() {
  yield takeLatest (COOKBOOK_ACTIONS.FETCH_CATEGORIES, fetchCategories)
}


export default categorySaga;
