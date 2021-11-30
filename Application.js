class Application{

    apiUrl = 'http://localhost:3000';
    idUser = 1;
    currentUser;

    constructor(){
                
        _fetch(apiUrl+`/users/${idUser}?_embed=levels`)
            .then((resp) => {
                resp.data.forEach(user => {
                    this.currentUser = new User(user).buildDataUser();
                });
            });

    }

    buildSkills(){

        
        return this;

    }
}


new Application()
    .buildSkills();