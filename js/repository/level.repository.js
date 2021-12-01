import _fetch from "../utils";

const apiUrl = "http://localhost:3000";

function postLevel(level) {
  return fetch(`${apiUrl}/levels`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(level)
  });
}

function createLevel(skillId, currentUser) {
  let labels = ["Niveau 1", "Niveau 2", "Niveau 3"];
  let skills = [];
  for (let number = 1; number <= 3; number++) {
    skills.push(postLevel({
          label: labels[number-1],
          number: number,
          skillId: skillId,
          userId: currentUser.id
      }));
  }
  return skills;
}

export { postLevel, createLevel };
