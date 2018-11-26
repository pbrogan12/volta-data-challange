function getStations() {
  return fetch("https://api.voltaapi.com/v1/stations")
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(error => {
      console.error(error);
    });
}

export { getStations };
