import {_fetch} from "../utils";

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
          userId: currentUser.id,
          isValidated: false
      }));
  }
  return skills;
}


function udateLevel(levelId) {
    findById(levelId).then(level => {
        fetch(`${apiUrl}/levels/${levelId}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({...level, isValidated: !level.isValidated})
            });
    });

  // récup l'id + tranform en true
 
  
}

function findById(levelId) {
  return _fetch(`${apiUrl}/levels/${levelId}`);
}

export { postLevel, createLevel, udateLevel };
