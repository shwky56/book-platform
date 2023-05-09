import axios from 'axios'

// const API = axios.create({ baseURL: 'http://localhost:5000'})
const API = axios.create({ baseURL: process.env.REACT_APP_API})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('user')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }

    return req
})

// daefine end point for rest auth
// most tack { email, password }
export const signIn =(formData)=> API.post('/rest-auth/signin', formData);
//  { email, password, confirmPassword, phone}
export const signUp =(formData)=> API.post('/rest-auth/signup', formData);
// export const forgot = (formData) => API.post('/users/forgot', formData);
// export const reset = (formData) => API.post('/users/reset', formData);



// export const fe

export const fetchUsers =() => API.get('/user')
export const fetchUser =(id) => API.get(`/user/${id}`)
export const addUser =( user ) => API.post('/user', user)
export const updateUser = (id, updatedUser) => API.put(`/user/${id}`, updatedUser)
export const deleteInvoice =(id) => API.delete(`/invoices/${id}`)

export const fetchBook = (id) => API.get(`/book/${id}`);
export const fetchBooks = () => API.get(`/book/`);
export const fetchBookByfilter = ( filde, key ) => API.get(`/book/filter?${ filde }=${ key }`)
export const fetchBookBySearch = ( filde, value ) => API.get(`/book/search?${ filde }=${ value }`)
export const addBook =( book ) => API.post('/book', book)
export const updateBook = (id, updatedBook) => API.patch(`/book/${id}`, updatedBook)
export const deleteBook =(id) => API.delete(`/book/${id}`)

export const fetchClientsByUser = (searchQuery) => API.get(`/clients/user?searchQuery=${searchQuery.search}`);




export const fetchProfilesBySearch = (searchQuery) => API.get(`/profiles/search?searchQuery=${searchQuery.search || searchQuery.year || 'none'}`);
export const fetchProfile = (id) => API.get(`/profiles/${id}`)
export const fetchProfiles = () => API.get('/profiles');
export const fetchProfilesByUser = (searchQuery) => API.get(`/profiles?searchQuery=${searchQuery.search}`)
export const createProfile = (newProfile) => API.post('/profiles', newProfile);
export const updateProfile = (id, updatedProfile) => API.patch(`/profiles/${id}`, updatedProfile);
export const deleteProfile = (id) => API.delete(`/profiles/${id}`);