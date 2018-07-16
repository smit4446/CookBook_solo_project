import { put, takeLatest } from 'redux-saga/effects';
// import { USER_ACTIONS } from '../actions/userActions';
import {COOKBOOK_ACTIONS} from '../actions/cookbookActions';
import {getCategories, postCategory, deleteCategory} from '../requests/categoryRequests';

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


function* deleteCategories(action) {
  console.log('action.payload:', action.payload);
  try {
    let id = action.payload
    yield deleteCategory(id);
    console.log('in category saga');
    yield put ({
      type: COOKBOOK_ACTIONS.FETCH_CATEGORIES
    })
  } catch(error) {
    console.log('error in category saga on delete', error);
  }
}

function* addCategory(action) {
  console.log('action.payload:', action.payload);
  try {
    let category = action.payload
    yield postCategory(category);
    console.log('in category saga');
    yield put ({
      type: COOKBOOK_ACTIONS.FETCH_CATEGORIES
    })
  } catch (error) {
   console.log('error in category saga', error);
  }
}

function* categorySaga() {
  yield takeLatest (COOKBOOK_ACTIONS.FETCH_CATEGORIES, fetchCategories)
  yield takeLatest (COOKBOOK_ACTIONS.POST_CATEGORY, addCategory)
  yield takeLatest (COOKBOOK_ACTIONS.DELETE_CATEGORY, deleteCategories)
}


export default categorySaga;
