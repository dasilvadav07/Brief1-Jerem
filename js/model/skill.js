class Skill {
  id;
  label;
  activatityId;
  constructor(skill) {
    this.id = skill.id;
    this.label = skill.label;
    this.activatityId = skill.activatityId;
  }
}

export default Skill;
