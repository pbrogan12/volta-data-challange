/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class MeterAggregate extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.active_stations}>
          <Text>✅ {this.props.num_active_meters}</Text>
        </View>
        <View style={styles.needs_service_stations}>
          <Text>⚠️ {this.props.num_needs_service_meters}</Text>
        </View>
        <View style={styles.decommissioned_stations}>
          <Text>❌ {this.props.num_decommissioned_meters}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  active_stations: {
    flex: 1,
    backgroundColor: "green"
  },

  needs_service_stations: {
    flex: 1,
    backgroundColor: "yellow"
  },

  decommissioned_stations: {
    flex: 1,
    backgroundColor: "red"
  },

  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch"
  }
});
