/* @flow */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  SafeAreaView
} from "react-native";
import MapView, {
  Marker,
  Circle,
  AnimatedRegion,
  Animated
} from "react-native-maps";
import StationItem from "../components/StationItem.js";
import MeterAggregate from "../components/MeterAggregate.js";
import { getStations } from "../api.js";
import {
  getBoundaryBox,
  filterStationsByDistance,
  computeStationAggregates
} from "../utils.js";

// The radius of the range circle in miles
// TODO: Make this user changeable
const RADIUS = 50;
const METERS_IN_MILE = 1609.34;

export default class StationListScreen extends Component {
  state = {
    current_location: {
      // Volta HQ
      latitude: 37.768249,
      longitude: -122.40181
    },
    num_active_meters: 0,
    num_needs_service_meters: 0,
    num_decommissioned_meters: 0,
    loading: true,
    stations: []
  };

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(position =>
      this.fetchStations(position)
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  moveToLocation = position => {
    newRegion = {
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      latitude: position.latitude,
      longitude: position.longitude
    };

    this.map.animateToRegion(newRegion, 500);
  };

  fetchStations(position) {
    getStations().then(response => {
      // Filter stations by our current position
      stations = filterStationsByDistance(response, position.coords, RADIUS);

      // Compute aggregate stats on the stations in range
      station_stats = computeStationAggregates(stations);

      // Get a list of all station ids.
      // Used to zoom map correctly to fit all markers in viewport
      station_ids = stations.map(station => station.id);
      animationTime = setTimeout(() => {
        this.map.fitToSuppliedMarkers(station_ids, true);
      }, 100);

      this.setState({
        stations: stations,
        current_location: position.coords,
        loading: false,
        num_active_meters: station_stats.num_active_meters,
        num_needs_service_meters: station_stats.num_needs_service_meters,
        num_decommissioned_meters: station_stats.num_decommissioned_meters
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <MapView
            ref={map => {
              this.map = map;
            }}
            showsMyLocationButton={true}
            showsUserLocation={true}
            style={StyleSheet.absoluteFillObject}
          >
            {this.state.stations.map(marker => (
              <Marker
                key={marker.id}
                title={marker.name}
                description={marker.status}
                identifier={marker.id}
                coordinate={{
                  latitude: marker.location.coordinates[1],
                  longitude: marker.location.coordinates[0]
                }}
              />
            ))}
            <Circle
              center={this.state.current_location}
              strokeColor="#007FFF"
              fillColor="rgba(0, 127, 255,.1)"
              radius={RADIUS * METERS_IN_MILE}
            />
          </MapView>
        </View>
        <View style={{ height: 30 }}>
          <MeterAggregate
            num_active_meters={this.state.num_active_meters}
            num_needs_service_meters={this.state.num_needs_service_meters}
            num_decommissioned_meters={this.state.num_decommissioned_meters}
          />
        </View>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={this.state.stations}
            refreshing={this.loading}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => (
              <TouchableHighlight
                underlayColor="grey"
                onPress={() => this.moveToLocation(item)}
              >
                <StationItem
                  name={item.name}
                  meters={item.meters}
                  status={item.status}
                  distance={item.distance}
                />
              </TouchableHighlight>
            )}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
