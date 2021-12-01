import _fetch from "../utils";

const apiUrl = "http://localhost:3000";

function getUserById(userId) {
  return _fetch(`${apiUrl}/users/${userId}?_embed=levels`);
}

export { getUserById };
