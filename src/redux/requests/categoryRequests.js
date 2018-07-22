import axios from 'axios';

export function getCategories() {
    return axios.get('/cookbook')
    .then(response => response.data)
    .catch((error)=>{
        console.log('error getting categories', error);
        throw error.response || error;      
    })
}

export function postCategory(category){
    return axios.post('/cookbook', category)
    .then((response) => {
        console.log('successfully posted category');
    })
    .catch((error) => {
        console.log('error posting category', error);
        throw error.response || error;
    })
}

export function deleteCategory(id){
    return axios.delete(`/cookbook/${id}`)
    .then((response) => {
        console.log('successfully deleted category');
    })
    .catch((error) => {
        console.log('error deleting category', error);
        throw error.response || error;
    })
}

export function updateCategory(category, id){
    console.log('the category is: ', category, id)
    return axios.put(`/cookbook/${id}`, category)
    .then((response) => {
        console.log('successfully updated category', response);
    })
    .catch((error) => {
        console.log('error updating category', error);
        throw error.response || error;
    })
}

