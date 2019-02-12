import React, { Component } from "react";
import { ActivityIndicator, View, Text } from "react-native";

import RepositoriesComponent from "../components/RepositoriesComponent";

class RepositoriesScreen extends Component {
  render() {
    const { isLoading, error, repositories } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator
            animating={isLoading}
            style={{ alignItems: "center", justifyContent: "center" }}
            size="large"
            color="black"
          />
        ) : null}
        {error && !repositories ? (
          <Text
            style={{
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            Something went wrong
          </Text>
        ) : null}
        {repositories && !isLoading ? (
          repositories.length > 0 ? (
            <RepositoriesComponent repositories={repositories} />
          ) : (
            <Text
              style={{
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              No data available
            </Text>
          )
        ) : null}
      </View>
    );
  }
}

export default RepositoriesScreen;
