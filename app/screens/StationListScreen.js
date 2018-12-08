/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import MapView, { Marker } from "react-native-maps";
import StationItem from "../components/StationItem.js";
import { getStations } from "../api.js";
import { getBoundaryBox, filterStationsByDistance } from "../utils.js";

export default class StationListScreen extends Component {
  state = {
    loading: true,
    stations: []
  };

  componentDidMount() {
    this.fetchStations();
  }

  fetchStations() {
    getStations().then(response => {
      center_coordinate = {
        longitude: -121.895,
        latitude: 37.3394
      };
      stations = filterStationsByDistance(response, center_coordinate, 50);
      this.setState({ stations: stations, loading: false });
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
          </MapView>
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
