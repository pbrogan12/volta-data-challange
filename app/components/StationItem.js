/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class StationItem extends Component {
  render() {
    const { name, meters, status, distance } = this.props;

    statusComponent = null;

    // Determine the status of the station
    if (status === "active") {
      statusComponent = <Icon name="check" size={25} color="#32B76C" />;
    } else if (status === "needs service" || status === "under construction") {
      statusComponent = <Icon name="warning" size={25} color="#FAA030" />;
    } else if (status === "decommissioned") {
      statusComponent = <Icon name="ban" size={25} color="#EE2C38" />;
    }

    return (
      <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.station_name}
          >
            {name}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20 }}>
            {statusComponent}
            <Icon name="plug" size={25} /> {meters.length}
          </Text>
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
    paddingTop: 10,
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
