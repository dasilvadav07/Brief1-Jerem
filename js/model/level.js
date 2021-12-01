class Level {
  id;
  label;
  number;
  skillId;
  isValidated;
  userId;
  isValidated;
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
