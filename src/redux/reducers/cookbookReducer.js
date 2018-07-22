import {combineReducers} from 'redux';
import { COOKBOOK_ACTIONS } from '../actions/cookbookActions';

const cookbook = (state=[], action) => {
    switch(action.type) {
        case COOKBOOK_ACTIONS.SHOW_COOKBOOKS:
            console.log('in cookbook reducer for GET', action.payload);
            return action.payload;
        case COOKBOOK_ACTIONS.POST_COOKBOOK:
            console.log('in cookbook reducer for POST');
            return [action.payload]
        case COOKBOOK_ACTIONS.DELETE_COOKBOOK:
            console.log('in cookbook reducer for DELETE');
            return [action.payload]
        case COOKBOOK_ACTIONS.UPDATE_COOKBOOK:
            console.log('in cookbook reducer for PUT', action.payload);
            return [action.payload]
        default:
            return state;  
    }
}

const category = (state=[], action) => {
    switch(action.type) {
        case COOKBOOK_ACTIONS.SHOW_CATEGORIES:
            console.log('in category reducer for GET');
            return action.payload;
        case COOKBOOK_ACTIONS.POST_CATEGORY:
            console.log('in category reducer for POST');
            return [action.payload]
        case COOKBOOK_ACTIONS.DELETE_CATEGORY:
            console.log('in category reducer for DELETE');
            return [action.payload]
        case COOKBOOK_ACTIONS.UPDATE_CATEGORY:
            console.log('in category reducer for PUT');
            return [action.payload]
        default:
            return state;  
    }
}

const activeCookbook = (state=[], action) => {
    switch(action.type) {
        case 'SET_ACTIVE_BOOK':
            console.log('in active book reducer');
            return action.payload;
        default:
            return state;  
    }
}

const activeCategory =(state=[], action) => {
    switch(action.type) {
        case 'SET_ACTIVE_CATEGORY':
            console.log('in active category reducer');
            return action.payload;
        default:
            return state;
    }
}

const recipe = (state=[], action) => {
    switch(action.type) {
        case COOKBOOK_ACTIONS.SHOW_RECIPES:
            console.log('in recipe reducer');
            return action.payload;
        case COOKBOOK_ACTIONS.POST_RECIPE:
            console.log('in recipe reducer for POST');
            return [action.payload]
        case COOKBOOK_ACTIONS.DELETE_RECIPE:
            console.log('in recipe reducer for DELETE');
            return [action.payload]
        case COOKBOOK_ACTIONS.UPDATE_RECIPE:
            console.log('in recipe reducer for UPDATE', action.payload);
            return [action.payload]
        default:
            return state;  
    }
}

const likes = (state=[], action) => {
    switch(action.type) {
        case COOKBOOK_ACTIONS.SHOW_LIKES:
            console.log('in recipe reducer');
            return action.payload;
        case COOKBOOK_ACTIONS.LIKE_RECIPE:
            console.log('in recipe reducer for LIKE', action.payload);
            return [action.payload]
        case COOKBOOK_ACTIONS.DELETE_LIKE:
            console.log('in recipe reducer for DELETE');
            return [action.payload]
        default:
            return state; 
    }
}

export default combineReducers({
    cookbook,
    category,
    recipe,
    likes,
    activeCookbook,
    activeCategory
})

