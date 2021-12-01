import _fetch from "../utils";

const apiUrl = "http://localhost:3000";

function getActivity() {
  return _fetch(`${apiUrl}/activity`);


  
}

export { getActivity };
