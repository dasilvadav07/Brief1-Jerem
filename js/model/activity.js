class Activity {
  id;
  description;
  skills=[];
  constructor(activity) {
    this.id = activity.id;
    this.description = activity.description;
    this.skills = activity.skills;
  }
}
export default Activity;