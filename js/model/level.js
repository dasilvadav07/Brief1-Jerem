class Level {
  id;
  label;
  number;
  skillId;
  userId;
  constructor(id, label, number, skillId, userId) {
    this.id = id;
    this.label = label;
    this.number = number;
    this.skillId = skillId;
    this.userId = userId;
  }
}

export default Level;
