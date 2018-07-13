import {combineReducers} from 'redux';
import axios from 'axios';
import { COOKBOOK_ACTIONS } from '../actions/cookbookActions';

const cookbook = (state=[], action) => {
    switch(action.type) {
        case COOKBOOK_ACTIONS.SHOW_COOKBOOKS:
            console.log('in cookbook reducer');
            return action.payload;
        default:
            return state;  
    }
}

// const cookbook = (state = [], action) => {
//     console.log('in cookbookReducer');
//     if (action.type === 'ADD_COOKBOOK') {
//         axios.post('/main', action.payload).then(response => {
//             console.log('added cookbook');
//         }).catch(error => {
//             console.log(error);    
//         })
//     } else if (action.type === 'ADD_CATEGORY') {
//         axios.post('/cookbook', action.payload).then(response => {
//             console.log('added category'); 
//         }).catch(error => {
//             console.log(error);  
//         })
//     } else if (action.type === 'ADD_RECIPE') {
//         axios.post('/category', action.payload).then(response => {
//             console.log('added recipe');
//         }).catch(error => {
//             console.log(error);    
//         })
//     } else if (action.type === COOKBOOK_ACTIONS.SHOW_COOKBOOKS) {
//         console.log('getting cookbook(s)');
//         state = 
      
//     }  else if (action.type === 'GET_CATEGORY') {
//         console.log('getting categories');
//         axios.get('/cookbook').then(response => {
//             console.log(response.data.rows);
//             state = response.data.rows;            
//         }).catch(error => {
//             console.log(error); 
//         })
//     }  else if (action.type === 'GET_RECIPE') {
//         console.log('getting recipies');
//         axios.get('/category').then(response => {
//             console.log(response.data.rows);
//             state = response.data.rows;            
//         }).catch(error => {
//             console.log(error); 
//         })
//     } else if (action.type === 'GET_RECIPE_INFO') {
//         console.log('getting recipies');
//         axios.get('/recipe').then(response => {
//             console.log(response.data.rows);
//             state = response.data.rows;            
//         }).catch(error => {
//             console.log(error); 
//         })
//     }
//     return state;
// }

export default combineReducers({
    cookbook
})

