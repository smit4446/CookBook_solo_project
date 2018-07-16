import axios from 'axios';

export function getRecipes() {
    return axios.get('/category')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting recipes', error);
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

