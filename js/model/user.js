class User {
  id;
  firstName;
  lastName;
  avatar;
  levels = [];

  constructor(user) {
    this.id = user.id;
    this.lastName = user.lastName;
    this.firstName = user.firstName;
    this.avatar = user.avatar;
    this.levels = user.levels;
  }

  
}

export default User;