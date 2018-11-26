/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import StationItem from "../components/StationItem.js";
import { getStations } from "../api.js";

export default class StationListScreen extends Component {
  state = {
    loading: true,
    stations: []
  };

  componentDidMount() {
    getStations().then(response => {
      this.setState({ stations: response, loading: false });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.stations}
          refreshing={this.loading}
          renderItem={({ item }) => (
            <StationItem
              name={item.name}
              meters={item.meters}
              status={item.status}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
