import { put, takeLatest } from 'redux-saga/effects';
import {COOKBOOK_ACTIONS} from '../actions/cookbookActions';
import {getCookbooks, postCookbook, deleteCookbook, updateCookbook} from '../requests/cookbookRequests';


//generator function
function* fetchCookbooks() {
  try {
    let cookbooks = yield getCookbooks();
    console.log('in cookbook saga', cookbooks);
    yield put({
      type: COOKBOOK_ACTIONS.SHOW_COOKBOOKS,
      payload: cookbooks
    });
  } catch (error) {
   console.log('error in cookbook saga', error);
  }
}

function* deleteBook(action) {
  console.log('action.payload:', action.payload);
  try {
    let id = action.payload
    yield deleteCookbook(id);
    console.log('in cookbook saga');
    yield put ({
      type: COOKBOOK_ACTIONS.FETCH_COOKBOOKS
    })
  } catch(error) {
    console.log('error in cookbook saga on delete', error);
  }
}

function* createCookbook(action) {
  console.log('action.payload:', action.payload);
  try {
    let cookbook = action.payload
    yield postCookbook(cookbook);
    console.log('in cookbook saga');
    yield put ({
      type: COOKBOOK_ACTIONS.FETCH_COOKBOOKS
    })
  } catch (error) {
   console.log('error in cookbook saga', error);
  }
}

function* editCookbook(action) {
  console.log('action.payload:', action.payload);
  try {
    let book = action.payload
    let id = action.payload.id
    yield updateCookbook(book, id);
    console.log('in cookbook saga');
    yield put ({
      type: COOKBOOK_ACTIONS.FETCH_COOKBOOKS
    })
  } catch(error) {
    console.log('error in cookbook saga on put', error);
  }
}

function* cookbookSaga() {
  yield takeLatest (COOKBOOK_ACTIONS.FETCH_COOKBOOKS, fetchCookbooks)
  yield takeLatest (COOKBOOK_ACTIONS.POST_COOKBOOK, createCookbook)
  yield takeLatest (COOKBOOK_ACTIONS.DELETE_COOKBOOK, deleteBook)
  yield takeLatest (COOKBOOK_ACTIONS.UPDATE_COOKBOOK, editCookbook) 
}


export default cookbookSaga;
