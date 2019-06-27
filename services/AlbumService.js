import axios from 'axios'
    
    const apiClient = axios.create({
      baseURL: `http://127.0.0.1:8000/api`,
      withCredentials: false, // This is the default
      headers: {
        Accept: 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Credentials" : "true",

        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryIn312MOjBWdkffIM'
      }
    })
    // 'Content-Type': 'application/json',
    // 'application/json',

    export default {

      // Nie mogę za bardzo ingerować w tą funkcję zamieniając to np w Array bo zwaracana jest alians funkcji ( albo wskaźnik do funkcji) a nie Object.
      getPost(id) {  
        return  apiClient('/posts?id=' + id) // PAMIĘTAJ o znaku zapytania !!
      },

      getPosts(perPage, page){
        //return apiClient('/posts?_limit=' + perPage + '&_page=' + page)
        return apiClient('/posts/' + perPage + '/' + page )
        //return apiClient('posts?_sort=id&_order=desc' + '&_limit=' + perPage + '&_page=' + page)

      },

      Post(post){
        //console.log("POst post")
        return apiClient.post('/posts',  post )       
      },

      albumsCounter(){
        return apiClient.get('/posts')
      },
      
      delete(id){
        // return jest niezbędny bo przekazuję alians do funkcji
        // dzięki temu mogę wykorzystywać .then i .cache
        return apiClient.delete('/posts/' + id)  
      },

      update(post){
        // return jest niezbędny bo przekazuję alians do funkcji
        // dzięki temu mogę wykorzystywać .then i .cache
        //console.log('post: ', post.title)

        return apiClient.put('/posts/' + post.id, post)
      },
      
      uploadImage(file){
        let formData = new FormData();
        //formData.append('image', file, file.fileName);
        formData.set('image', file)
        //console.log('file: ', formData,)
        return apiClient.post('/uploadImage', formData)
      }

    }