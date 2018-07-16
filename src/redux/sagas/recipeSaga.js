import { put, takeLatest } from 'redux-saga/effects';
// import { USER_ACTIONS } from '../actions/userActions';
// import axios from 'axios';
import {COOKBOOK_ACTIONS} from '../actions/cookbookActions';
import {getRecipes, deleteRecipe, postRecipe} from '../requests/recipeRequests';

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

function* deleteRecipes(action) {
  console.log('action.payload:', action.payload);
  try {
    let id = action.payload
    yield deleteRecipe(id);
    console.log('in recipe saga');
    yield put ({
      type: COOKBOOK_ACTIONS.FETCH_RECIPES
    })
  } catch(error) {
    console.log('error in recipe saga on delete', error);
  }
}

function* addRecipe(action) {
  console.log('action.payload:', action.payload);
  try {
    let recipe = action.payload
    yield postRecipe(recipe);
    console.log('in recipe saga');
    yield put ({
      type: COOKBOOK_ACTIONS.FETCH_RECIPES
    })
  } catch (error) {
   console.log('error in recipe saga', error);
  }
}

function* recipeSaga() {
  yield takeLatest (COOKBOOK_ACTIONS.FETCH_RECIPES, fetchRecipes)
  yield takeLatest (COOKBOOK_ACTIONS.POST_RECIPE, addRecipe)
  yield takeLatest (COOKBOOK_ACTIONS.DELETE_RECIPE, deleteRecipes)
}


export default recipeSaga;
