/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class StationItem extends Component {
  render() {
    const { name, meters, status } = this.props;
    return (
      <View style={styles.container}>
        <Text>
          {name} - {status} - {meters.length}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
