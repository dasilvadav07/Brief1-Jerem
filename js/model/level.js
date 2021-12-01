class Level {
  id;
  label;
  number;
  skillId;
  isValidated;
  userId;
<<<<<<< HEAD
=======
  isValidated;
>>>>>>> b78c39a58317ae0da0499b87d0e5781456d4cae4
  constructor(level) {
    this.id = level.id;
    this.label = level.label;
    this.number = level.number;
    this.skillId = level.skillId;
    this.userId = level.userId;
    this.isValidated = level.isValidated;
  }
}
export default Level;
