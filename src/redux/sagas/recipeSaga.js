import { put, takeLatest } from 'redux-saga/effects';
import { USER_ACTIONS } from '../actions/userActions';
import axios from 'axios';
import {COOKBOOK_ACTIONS} from '../actions/cookbookActions';
import {getRecipes} from '../requests/cookbookRequests';


//generator function
function* fetchRecipes() {
  try {
    let recipes = yield getRecipes();
    console.log('in recipe saga');
    yield put({
      type: COOKBOOK_ACTIONS.SHOW_RECIPES,
      payload: recipes
    });
  } catch (error) {
   console.log('error in recipes saga', error);
  }
}

function* recipeSaga() {
  yield takeLatest (COOKBOOK_ACTIONS.FETCH_RECIPES, fetchRecipes)
}


export default recipeSaga;
