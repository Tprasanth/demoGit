import React, { Component } from "react";
import { Toolbar } from "react-native-material-ui";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTitle: props.headerTitle,
      navigate: props.navigation,
      stackLevel: props.stackLevel,
      navigationIcon: props.navigationIcon
    };
  }

  onPressDrawer = () => {};

  render() {
    return (
      <Toolbar
        onLeftElementPress={this.onPressDrawer}
        leftElement={
          this.state.stackLevel === 1 ? this.state.navigationIcon : null
        }
        centerElement={this.state.headerTitle}
        style={{
          container: {
            backgroundColor: "black",
            elevation: 0
          },
          leftElement: { color: "white" },
          titleText: { color: "white" }
        }}
      />
    );
  }
}

export default HeaderComponent;
