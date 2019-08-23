import axios from 'axios'
    
    const apiClient = axios.create({
      baseURL: `http://127.0.0.1:8000/api`,
      withCredentials: false, // This is the default
      headers: {
        Accept:  'application/json',
        //Accept: 'multipart/form-data',
        
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Credentials" : "true",
         'Content-Type': 'application/json',
      }
    })
    //'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryIn312MOjBWdkffIM'  

    export default {
       //////////////////////////////////////////
      // Nie mogę za bardzo ingerować w tą funkcję zamieniając to np w Array bo zwaracana jest alians funkcji ( albo wskaźnik do funkcji) a nie Object.
      getArticle(id) {  
        //return  apiClient('/albums?id=' + id) // PAMIĘTAJ o znaku zapytania !!
        return apiClient.get('/article/' + id)
      },

      storeArticle(article){

        if (Array.isArray(article))
          console.log('%c UWAGA!', 'color: #ff0000', ' Zmienna article jest tablicą. Natmiast api oczekuje na object')
        
        let formData = new FormData();
        
        Object.keys(article).forEach(function(key){
          formData.set(key, article[key])
        });

        return apiClient.post('/article',  formData ) 
      },

      //////////////////////////////////////////

    }