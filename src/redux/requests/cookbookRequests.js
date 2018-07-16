import axios from 'axios';

export function getCookbooks() {
    return axios.get('/main')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting cookbooks', error);
        throw error.response || error;
    })
}

export function postCookbook(cookbook){
    return axios.post('/main', cookbook)
    .then((response) => {
        console.log('successfully posted cookbook');
    })
    .catch((error) => {
        console.log('error posting cookbook', error);
        throw error.response || error;
    })
}

export function deleteCookbook(id){
    return axios.delete(`/main/${id}`)
    .then((response) => {
        console.log('successfully deleted cookbook');
    })
    .catch((error) => {
        console.log('error deleting cookbook', error);
        throw error.response || error;
    })
}

// export function getCategories() {
//     return axios.get('/cookbook')
//     .then(response => response.data)
//     .catch((error)=>{
//         console.log('error getting categories', error);
//         throw error.response || error;      
//     })
// }

export function getRecipes() {
    return axios.get('/category')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting recipes', error);
        throw error.response || error;      
    })
}