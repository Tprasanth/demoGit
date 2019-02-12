import React, { Component } from "react";
import { View, Text } from "react-native";

class OverviewScreen extends Component {
  render() {
    return (
      <View>
        <Text
          style={{
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          OverviewScreen
        </Text>
      </View>
    );
  }
}

export default OverviewScreen;
