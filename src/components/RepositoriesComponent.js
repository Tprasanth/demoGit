import React, { Component } from "react";
import { Card } from "react-native-elements";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import LanguageColors from "../utils/LanguageColors.json";

class RepositoriesComponent extends Component {
  constructor(props) {
    super(props);
  }

  renderMeta = item => {
    return (
      <View style={styles.metaContainer}>
        <View style={[styles.metaSubContainer, { flex: 1 }]}>
          <Image
            source={require("../../assets/star.png")}
            resizeMode="center"
            style={styles.metaIndicatorStyle}
          />
          <Text>{item.stargazers_count}</Text>
        </View>
        <View style={[styles.metaSubContainer, { flex: 4 }]}>
          {item.language && (
            <View
              style={[
                styles.colorIndicator,
                {
                  backgroundColor: LanguageColors[item.language].color
                }
              ]}
            />
          )}
          <Text>{item.language}</Text>
        </View>
      </View>
    );
  };

  renderRepositoryItem = item => {
    return (
      <Card containerStyle={styles.itemContainerStyle} key={item.node_id}>
        <View style={{ flexDirection: "row" }}>
          <View>
            {item.fork ? (
              <Image
                source={require("../../assets/fork.png")}
                resizeMode="center"
                style={styles.indicatorIconSize}
              />
            ) : (
              <Image
                source={require("../../assets/logo.png")}
                resizeMode="center"
                style={styles.indicatorIconSize}
              />
            )}
          </View>
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.ownerStyle}>{item.owner.login}/</Text>
              <Text style={styles.titleStyle}>{item.name}</Text>
            </View>
            <Text style={styles.descriptionStyle}>{item.description}</Text>
            {this.renderMeta(item)}
          </View>
        </View>
      </Card>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 8 }}>
        <FlatList
          key="repositories_component"
          data={this.props.repositories}
          renderItem={({ item }) => this.renderRepositoryItem(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainerStyle: {
    margin: 0
  },
  metaContainer: { flexDirection: "row", marginTop: 4 },
  metaSubContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  colorIndicator: {
    height: 12,
    width: 12,
    marginRight: 4,
    borderRadius: 6
  },
  metaIndicatorStyle: {
    height: 12,
    width: 12,
    marginRight: 4
  },
  indicatorIconSize: {
    height: 24,
    width: 24,
    margin: 8
  },
  ownerStyle: {
    fontSize: 16,
    color: "#0366d6"
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0366d6"
  },
  descriptionStyle: {
    fontSize: 12,
    color: "#586069"
  }
});
export default RepositoriesComponent;
