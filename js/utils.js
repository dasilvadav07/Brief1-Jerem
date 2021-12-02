const _fetch = (url) =>{
   return fetch(url)
        .then(function(response) {
            return response.json();    
        })
}

function _getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

export { _fetch, _getRandom } ;
