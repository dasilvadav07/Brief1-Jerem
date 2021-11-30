const _fetch = (url) =>{
   return fetch(url)
        .then(function(response) {
            return response.json();    
        })
}


export default _fetch;