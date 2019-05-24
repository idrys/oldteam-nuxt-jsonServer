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

      // Nie mogę za bardzo ingerować w tą funkcję zamieniając to np w Array bo zwaracana jest alians funkcji ( albo wskaźnik do funkcji) a nie Object.
      getPost(id) {  
        return  apiClient('/posts?id=' + id) // PAMIĘTAJ o znaku zapytania !!
      },

      getPosts(perPage, page){
        return apiClient('/posts?_limit=' + perPage + '&_page=' + page)
      },

      Post(post){
        //console.log("POst post")
        return apiClient.post('/posts',  post )       
      },
      
      
    }