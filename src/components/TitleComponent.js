import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";

class TitleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }
  onSearchTextChanged = searchText => {
    this.setState({ searchText }, () => {
      this.props.onSearchTextChanged(searchText);
    });
  };
  render() {
    return this.props.icons ? (
      <View style={styles.iconContainer}>
        {this.props.icons.search ? (
          <SearchBar
            placeholder="search here..."
            onChangeText={this.onSearchTextChanged}
            value={this.state.searchText}
            containerStyle={{ flex: 1, backgroundColor: "black" }}
            inputStyle={{ color: "white", fontSize: 14 }}
          />
        ) : null}
        {this.props.icons.logo ? (
          <Image
            source={require("../../assets/icon.png")}
            resizeMode="contain"
            style={[styles.actionbarIconStyle, { flex: 1 }]}
          />
        ) : null}
        <Image
          source={require("../../assets/notification_logo.png")}
          resizeMode="center"
          style={styles.actionbarIconStyle}
        />
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  tab: {
    backgroundColor: "white",
    padding: 8
  },
  indicator: {
    backgroundColor: "orange",
    height: 3
  },
  actionbarIconStyle: {
    height: 38,
    width: 38,
    marginTop: 8
  }
});

export default TitleComponent;
