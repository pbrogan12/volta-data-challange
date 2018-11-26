/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { getStations } from "../api.js";

export default class StationListScreen extends Component {
  state = {
    loading: true,
    stations: []
  };

  renderItem = ({ item }) => {
    return <Text>{item.id}</Text>;
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
          renderItem={this.renderItem}
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
