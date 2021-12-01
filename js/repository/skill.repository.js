import _fetch from "../utils";

const apiUrl = "http://localhost:3000";

function getSkills() {
  return _fetch(`${apiUrl}/skills`);
}

export { getSkills };
