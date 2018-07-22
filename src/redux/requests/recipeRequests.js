import axios from 'axios';

export function getRecipes() {
    return axios.get('/category')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting recipes', error);
        throw error.response || error;      
    })
}

export function getLikes() {
    return axios.get('/category/like')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting likes', error);
        throw error.response || error;      
    })
}

export function postRecipe(recipe){
    return axios.post('/category', recipe)
    .then((response) => {
        console.log('successfully posted recipe');
    })
    .catch((error) => {
        console.log('error posting recipe', error);
        throw error.response || error;
    })
}

export function deleteRecipe(id){
    return axios.delete(`/category/${id}`)
    .then((response) => {
        console.log('successfully deleted recipe');
    })
    .catch((error) => {
        console.log('error deleting recipe', error);
        throw error.response || error;
    })
}

export function deleteLike(id){
    return axios.delete(`/category/like/${id}`)
    .then((response) => {
        console.log('successfully deleted like');
    })
    .catch((error) => {
        console.log('error deleting like', error);
        throw error.response || error;
    })
}

export function postLikeRecipe(id){
    return axios.post('/category/like', {id:id})
    .then((response) => {
        console.log('successfully posted like');
    })
    .catch((error) => {
        console.log('error updating recipe', error);
        throw error.response || error; 
    })
}

export function putNameRecipe(recipe, id){
    return axios.put(`/category/name/${id}`, recipe)
    .then((response) => {
        console.log('successfully updated recipe', response);
    })
    .catch((error) => {
        console.log('error updating recipe', error);
        throw error.response || error; 
    })
}


