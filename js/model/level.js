class Level {
  id;
  label;
  number;
  skillId;
  userId;
  isValidated;
  constructor(id, label, number, skillId, userId, isValidated) {
    this.id = id;
    this.label = label;
    this.number = number;
    this.skillId = skillId;
    this.userId = userId;
    this.isValidated = isValidated;
  }
}

export default Level;
