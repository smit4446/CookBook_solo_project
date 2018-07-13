import axios from 'axios';

export function getCookbooks() {
    return axios.get('/main')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting cookbooks', error);
        throw error.response || error;
    })
}

export function getCategories(){
    return axios.get('/cookbook')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting cookbooks', error);
        throw error.response || error;      
    })
}