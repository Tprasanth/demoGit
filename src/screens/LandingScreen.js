import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Animated,
  View,
  StatusBar
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import store from "../helpers/reducers/index";
import * as actions from "../helpers/actions/ServiceCallAction";

import { OverviewScreen, StarsScreen, RepositoriesScreen } from ".";
import HeaderComponent from "../components/HeaderComponent";
import TitleComponent from "../components/TitleComponent";

class LandingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      routes: [
        { key: "Overview", title: "Overview" },
        { key: "Repositories", title: "Repositories" },
        { key: "Stars", title: "Stars" }
      ],
      fetchedRepositories: null
    };
  }

  componentDidMount() {
    this.props.callWebservice();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.repositories.length > 0 && !this.state.fetchedRepositories)
      this.setState({ fetchedRepositories: this.props.repositories });
  }

  onSearchTextChanged = searchText => {
    if (searchText) {
      const searchedRepositories = this.props.repositories.filter(x => {
        return x.name.toLowerCase().includes(searchText.toLowerCase());
      });
      this.setState({ fetchedRepositories: searchedRepositories });
    } else {
      this.setState({ fetchedRepositories: this.props.repositories });
    }
  };

  getTabLabelText = scene => {
    const {
      route: { title, key }
    } = scene;

    return title;
  };

  getTabLabelCount = scene => {
    const {
      route: { title, key }
    } = scene;
    const { isLoading, error, repositories } = this.props;

    if (key === "Repositories") {
      if (repositories && repositories.length > 0)
        return `${repositories.length}`;
    } else if (key === "Overview") {
    } else if (key === "Stars") {
    }
    return null;
  };

  handleIndexChange = index => {
    this.setState({ index });
  };

  renderLabel(scene) {
    const {
      position,
      navigationState,
      getTabLabelText,
      getTabLabelCount
    } = this;
    const { routes } = navigationState;
    const { route } = scene;

    const label = getTabLabelText(scene);
    const labelCount = getTabLabelCount(scene);
    const inputRange = routes.map((x, i) => i);

    const color = position.interpolate({
      inputRange,
      outputRange: routes.map(r => (r === route ? "white" : "gray")),
      extrapolate: "clamp"
    });

    return (
      <Provider store={store}>
        <View style={styles.tabContainerStyle}>
          <StatusBar hidden />
          <Animated.Text style={{ color }}>{label}</Animated.Text>
          {labelCount && (
            <Animated.Text
              style={[
                styles.tabTitleCountStyle,
                {
                  color
                }
              ]}
            >
              {labelCount}
            </Animated.Text>
          )}
        </View>
      </Provider>
    );
  }

  overviewRoute = () => {
    return <OverviewScreen />;
  };

  repositoriesRoute = () => {
    const { isLoading, error, repositories } = this.props;
    const { fetchedRepositories } = this.state;

    return (
      <RepositoriesScreen
        isLoading={isLoading}
        error={error}
        repositories={fetchedRepositories ? fetchedRepositories : repositories}
      />
    );
  };

  starsRoute = () => {
    return <StarsScreen />;
  };

  renderScene = ({ route }) => {
    switch (route.key) {
      case "Overview":
        return this.overviewRoute();
      case "Repositories":
        return this.repositoriesRoute();
      case "Stars":
        return this.starsRoute();
      default:
        return null;
    }
  };

  render() {
    return (
      <View
        style={{
          height: "100%"
        }}
      >
        <HeaderComponent
          key={this.state.index}
          isStack
          navigationIcon="menu"
          headerTitle={
            <TitleComponent
              icons={{
                search: this.state.index === 1,
                logo: this.state.index !== 1
              }}
              onSearchTextChanged={this.onSearchTextChanged}
            />
          }
          stackLevel={1}
          navigation={this.props.navigation}
        />
        <TabView
          navigationState={this.state}
          renderScene={this.renderScene}
          onIndexChange={this.handleIndexChange}
          initialLayout={{ width: Dimensions.get("window").width, height: 54 }}
          renderTabBar={props => (
            <TabBar
              {...props}
              renderLabel={this.renderLabel}
              getTabLabelText={this.getTabLabelText}
              getTabLabelCount={this.getTabLabelCount}
              indicatorStyle={styles.indicator}
              tabStyle={styles.tabStyle}
              style={styles.tab}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContainerStyle: {
    flexDirection: "row"
  },
  tabTitleCountStyle: {
    paddingLeft: 4,
    paddingRight: 4,
    marginLeft: 4,
    borderRadius: 8,
    fontSize: 12,
    backgroundColor: "gray"
  },
  tabStyle: {
    backgroundColor: "black"
  },
  tab: {
    backgroundColor: "black",
    padding: 8
  },
  indicator: {
    backgroundColor: "white",
    height: 2
  }
});

const mapStateToProps = state => ({
  isLoading: state.serviceReducer.isLoading,
  error: state.serviceReducer.error,
  repositories: state.serviceReducer.data
});

export default connect(
  mapStateToProps,
  actions
)(LandingScreen);
