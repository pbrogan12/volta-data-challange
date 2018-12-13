/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class MeterAggregate extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.active_stations}>
          <Text style={styles.metrics_text}>
            <Icon name="check" size={30} /> {this.props.num_active_meters}
          </Text>
        </View>
        <View style={styles.needs_service_stations}>
          <Text style={styles.metrics_text}>
            <Icon name="warning" size={30} />{" "}
            {this.props.num_needs_service_meters}
          </Text>
        </View>
        <View style={styles.decommissioned_stations}>
          <Text style={styles.metrics_text}>
            <Icon name="ban" size={30} /> {this.props.num_decommissioned_meters}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  active_stations: {
    flex: 1,
    paddingLeft: 5,
    backgroundColor: "#32B76C"
  },

  needs_service_stations: {
    flex: 1,
    paddingLeft: 5,
    backgroundColor: "#FAA030"
  },

  decommissioned_stations: {
    flex: 1,
    paddingLeft: 5,
    backgroundColor: "#EE2C38"
  },

  metrics_text: {
    fontSize: 24
  },

  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
