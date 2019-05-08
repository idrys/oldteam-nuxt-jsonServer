import axios from 'axios'
    
    const apiClient = axios.create({
      baseURL: `http://localhost:3000`,
      withCredentials: false, // This is the default
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    
    export default {
      getPosts() {
        return apiClient.get('/posts')
      },

      // Nie mogę za bardzo ingerować w tą funkcję zamieniając to np w Array bo zwaracana jest alians funkcji ( albo wskaźnik do funkcji) a nie Object.
      getPost(id) {  
        return  apiClient.get('/posts/' + id) 
      }
    }