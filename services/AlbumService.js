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

      //////////////////////////////////////////
      // Nie mogę za bardzo ingerować w tą funkcję zamieniając to np w Array bo zwaracana jest alians funkcji ( albo wskaźnik do funkcji) a nie Object.
      getPost(id) {  
        //return  apiClient('/albums?id=' + id) // PAMIĘTAJ o znaku zapytania !!
        return apiClient.get('/album/' + id)
      },

      //////////////////////////////////////////
      getPosts(perPage, page){
        //return apiClient('/albums?_limit=' + perPage + '&_page=' + page)
        return apiClient('/albums/' + perPage + '/' + page )
        //return apiClient('albums?_sort=id&_order=desc' + '&_limit=' + perPage + '&_page=' + page)

      },

      //////////////////////////////////////////
      storeAlbum(album){
        //console.log("Album: ", album )
        let formData = new FormData();
        
        Object.keys(album).forEach(function(key){
          formData.set(key, album[key])
          //console.log(key + ' = ' + album[key]);
       });
        return apiClient.post('/album',  formData ) 
      },

      //////////////////////////////////////////
      storeArticle(article){

        let formData = new FormData();
        
        Object.keys(article).forEach(function(key){
          formData.set(key, article[key])
        });
        //formData.append('_method', 'POST');
        //console.log(formData[0])
        return apiClient.post('/article',  formData ) 
      },
      //////////////////////////////////////////


      albumsCounter(){
        return apiClient.get('/albums')
      },
      //////////////////////////////////////////
      delete(id){
        // axios.defaults.headers.common = {
        //   'X-Requested-With': 'XMLHttpRequest',
        //   'X-CSRF-TOKEN': window.csrf_token
        // }


        // return jest niezbędny bo przekazuję alians do funkcji
        // dzięki temu mogę wykorzystywać .then i .cache
        //console.log('Delete id:', id )
        return apiClient.delete('/album/' + id)  
      },

      //////////////////////////////////////////
      update(album){
        // return jest niezbędny bo przekazuję alians do funkcji
        // dzięki temu mogę wykorzystywać .then i .cache
        let formData = new FormData();
        //apiClient.data()
        Object.keys(album).forEach(function(key){
          formData.set(key, album[key])
          //console.log(key + ' = ' + album[key]);
        });
        formData.append('_method', 'PUT');
        //console.log('Przed post')
        return apiClient.post('/album/'+ album.id, formData)
      },
      
      //////////////////////////////////////////
      uploadImage(file){

        let formData = new FormData();
        formData.set('image', file)
        //console.log('file: ', formData,)
        return apiClient.post('/uploadImage', formData)

      //   console.log('Licza elementów: ', Object.keys(album).length)

      //   Object.keys(album).forEach(function(key){
      //     console.log(key + ' = ' + album[key]);
      //  });

      //   return apiClient.album('/uploadImage', formData)
      }

      // $this->validate($request, array(
      //   'first' => 'required',
      //   'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
      //   ));


    }