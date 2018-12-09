/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import StationItem from "../components/StationItem.js";
import MeterAggregate from "../components/MeterAggregate.js";
import { getStations } from "../api.js";
import {
  getBoundaryBox,
  filterStationsByDistance,
  computeStationAggregates
} from "../utils.js";

export default class StationListScreen extends Component {
  state = {
    num_active_meters: 0,
    num_needs_service_meters: 0,
    num_decommissioned_meters: 0,
    loading: true,
    stations: []
  };

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(position =>
      this.fetchStations(position)
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  fetchStations(position) {
    getStations().then(response => {
      // Filter stations by our current position
      stations = filterStationsByDistance(response, position.coords, 50);
      // Compute aggregate stats on the stations in range
      station_stats = computeStationAggregates(stations);
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
            showsMyLocationButton={true}
            showsUserLocation={true}
            style={StyleSheet.absoluteFillObject}
          >
            {this.state.stations.map(marker => (
              <Marker
                title={marker.name}
                description={marker.status}
                coordinate={{
                  latitude: marker.location.coordinates[1],
                  longitude: marker.location.coordinates[0]
                }}
              />
            ))}
            <Circle
              center={this.state.current_location}
              radius={50 * 1609.34}
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
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.stations}
            refreshing={this.loading}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item }) => (
              <StationItem
                name={item.name}
                meters={item.meters}
                status={item.status}
              />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
