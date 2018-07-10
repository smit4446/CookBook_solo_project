import {combineReducers} from 'redux';
import axios from 'axios';

const cookbook = (state = [], action =>{
    console.log('in cookbookReducer');
    if (action.type === 'ADD_COOKBOOK') {
        axios.post('/cookbook', action.payload).then(response => {
            console.log('added cookbook');
        }).catch(error => {
            console.log(error);    
        })
    } else if (action.type === 'ADD_CATEGORY') {
        axios.post('/cookbook', action.payload).then(response => {
            console.log('added category'); 
        }).catch(error => {
            console.log(error);  
        })
    } else if (action.type === 'ADD_RECIPE') {
        axios.post('/cookbook', action.payload).then(response => {
            console.log('added recipe');
        }).catch(error => {
            console.log(error);    
        })
    } else if (action.type === 'GET_COOKBOOK') {
        console.log('getting cookbook(s)');
        axios.get('/cookbook').then(response => {
            console.log(response.data.rows);
            state = resonse.data.rows;            
        }).catch(error => {
            console.log(error); 
        })
    }  else if (action.type === 'GET_CATEGORY') {
        console.log('getting categories');
        axios.get('/cookbook').then(response => {
            console.log(response.data.rows);
            state = resonse.data.rows;            
        }).catch(error => {
            console.log(error); 
        })
    }  else if (action.type === 'GET_RECIPE') {
        console.log('getting recipies');
        axios.get('/cookbook').then(response => {
            console.log(response.data.rows);
            state = resonse.data.rows;            
        }).catch(error => {
            console.log(error); 
        })
    }
    return state;
})

export default combineReducers({
    cookbook
})

