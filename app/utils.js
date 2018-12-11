import GeoPoint from "geopoint";
import geolib from "geolib";

/**
 * Given a latitude, longitude and radius return a bounding box where the
 * latitude and longitude are the center of the bounding box with the given
 * radius.
 * @param {number} lat is the latitude of the center of the bounding box
 * @param {number} long is the longitude of the center of the bounding box
 * @param {number} radius is the radius of the bounding box
 * @returns {top:number, bottom: number, left:number, right:number}
 * top is the latitude of the top of the bounding box.
 * bottom is the latiude of the bottom of the bounding box.
 * left is the longitude of the left boundary of the bounding box.
 * right is the longitude of the right boundary of the bounding box.
 **/
function getBoundaryBox(lat, long, radius) {
  const centerOfBoundingBox = new GeoPoint(lat, long);

  // boundingBox holds SW and NE points of the bounding box
  const boundingBox = centerOfBoundingBox.boundingCoordinates(radius);

  // Find the top, bottom, left, right of the boundary box
  const top = boundingBox[1].latitude();
  const bottom = boundingBox[0].latitude();
  const left = boundingBox[0].longitude();
  const right = boundingBox[1].longitude();

  return { top: top, left: left, right: right, bottom: bottom };
}

/**
 * Given an array of stations with longitude and latitude, center coordinate
 * and radius return a sorted array of stations that lie within the circle of a
 * given radius
 * @param {array} stations is the list of stations returned by the Volta api
 * @param {object} center_coord is the coordinate of the center of the circle
 * @param {number} radius is the radius of the circle in miles
 * @return {array} a sorted array of stations that lie in the specified circle
 **/
function filterStationsByDistance(stations, center_coord, radius) {
  const MILES_TO_METERS_FACTOR = 1609.34;
  stations_in_circle = stations.filter(function(station) {
    // Add the longitude and latitude property to each station so
    // geolib can find all stations that lie in circle
    station.longitude = station.location.coordinates[0];
    station.latitude = station.location.coordinates[1];
    return geolib.isPointInCircle(
      station,
      center_coord,
      radius * MILES_TO_METERS_FACTOR
    );
  });

  // Sort the stations by distance from the center_coord
  ordered_stations_in_circle = geolib.orderByDistance(
    center_coord,
    stations_in_circle
  );

  return ordered_stations_in_circle;
}

/**
 * Given an array of stations compute aggregate statistics
 * @param {array} stations is the list of stations returned by the Volta API
 * @return {object} an object that has how many active, needs
 * service, and decommissioned meters from the given list of stations
 **/
function computeStationAggregates(stations) {
  let num_active_meters = 0;
  let num_needs_service_meters = 0;
  let num_decommissioned_meters = 0;

  for (i = 0; i < stations.length; i++) {
    let station_status = stations[i].status;
    let num_meters = stations[i].meters.length;

    if (station_status === "active") {
      num_active_meters += num_meters;
    } else if (station_status === "needs_service") {
      num_needs_service_meters += num_meters;
    } else if (station_status === "decommissioned") {
      num_decommissioned_meters++;
    }
  }

  return {
    num_active_meters,
    num_needs_service_meters,
    num_decommissioned_meters
  };
}

export { getBoundaryBox, filterStationsByDistance, computeStationAggregates };
