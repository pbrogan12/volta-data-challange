/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class StationItem extends Component {
  render() {
    const { name, meters, status, distance } = this.props;

    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.station_name}
          >
            {name}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text> {status} </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.distance}>
            {(distance * 0.00062137).toFixed(1)} mi
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  station_name: {
    fontSize: 20
  },
  distance: {
    fontSize: 20
  }
});
