import _fetch from "../utils";

const apiUrl = "http://localhost:3000";

function getActivity() {
  return _fetch(`${apiUrl}/activity`);
}

function getSkillsByActivity(activityId) {
  return _fetch(`${apiUrl}/activity/${activityId}?_embed=skills`);
}

export { getActivity, getSkillsByActivity };
