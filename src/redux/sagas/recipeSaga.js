import { put, takeLatest } from 'redux-saga/effects';
// import { USER_ACTIONS } from '../actions/userActions';
// import axios from 'axios';
import {COOKBOOK_ACTIONS} from '../actions/cookbookActions';
import {getRecipes, deleteRecipe, postRecipe, postLikeRecipe, putNameRecipe, getLikes, deleteLike} from '../requests/recipeRequests';

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

function* fetchLikes() {
  try {
    let likes = yield getLikes();
    console.log('in recipe saga to get likes');
    yield put({
      type: COOKBOOK_ACTIONS.SHOW_LIKES,
      payload: likes
    });
  } catch (error) {
   console.log('error in recipes saga', error);
  }
}

function* removeLike(action) {
  console.log('action.payload:', action.payload);
  try {
    let id = action.payload
    yield deleteLike(id);
    console.log('in recipe saga');
    yield put ({
      type: COOKBOOK_ACTIONS.FETCH_LIKES
    })
  } catch(error) {
    console.log('error in recipe saga on delete', error);
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

function* likeRecipe(action) {
  console.log('action.payload:', action.payload);
  try {
    let id = action.payload
    yield postLikeRecipe(id);
    console.log('in recipe saga');
    yield put ({
      type: COOKBOOK_ACTIONS.FETCH_LIKES
    })
  } catch (error) {
   console.log('error in recipe saga', error);
  }
}

function* updateRecipe(action) {
  console.log('action.payload:', action.payload);
  try {
    let recipe = action.payload
    let id = action.payload.id
    yield putNameRecipe(recipe, id);
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
  yield takeLatest (COOKBOOK_ACTIONS.FETCH_LIKES, fetchLikes)
  yield takeLatest (COOKBOOK_ACTIONS.POST_RECIPE, addRecipe)
  yield takeLatest (COOKBOOK_ACTIONS.DELETE_RECIPE, deleteRecipes)
  yield takeLatest (COOKBOOK_ACTIONS.LIKE_RECIPE, likeRecipe)
  yield takeLatest (COOKBOOK_ACTIONS.UPDATE_RECIPE, updateRecipe)
  yield takeLatest (COOKBOOK_ACTIONS.DELETE_LIKE , removeLike)
}


export default recipeSaga;
