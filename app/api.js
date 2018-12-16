import { BASE_API_URL } from "./config.js";

function getStations() {
  return fetch(BASE_API_URL + "stations")
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.error(error);
    });
}

export { getStations };
