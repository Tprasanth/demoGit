import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator
} from "react-navigation";

import {
  LandingScreen,
  OverviewScreen,
  RepositoriesScreen,
  StarsScreen
} from "../screens";

const HomeScreen = createMaterialTopTabNavigator(
  {
    Overview: {
      screen: OverviewScreen,
      path: "/Overview",
      navigationOptions: {
        tabBarLabel: "Overview"
      }
    },
    Repositories: {
      screen: RepositoriesScreen,
      path: "/Repositories",
      navigationOptions: {
        tabBarLabel: "Repositories"
      }
    },
    Stars: {
      screen: StarsScreen,
      path: "/Stars",
      navigationOptions: {
        tabBarLabel: "Stars"
      }
    }
  },
  {
    initialRouteName: "Overview",
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "top",
    tabBarOptions: {
      labelStyle: {
        fontSize: 14,
        textAlign: "center"
      },
      iconStyle: {
        height: 24,
        width: 24
      },
      upperCaseLabel: false,
      activeTintColor: "white",
      inactiveTintColor: "grey",
      showIcon: true,
      style: {
        height: 56,
        backgroundColor: "black"
      },
      indicatorStyle: {
        height: 0
      }
    }
  }
);

const HomeNavigation = createStackNavigator(
  {
    Landing: { screen: LandingScreen }
  },
  {
    headerMode: "none",
    initialRouteName: "Landing"
  }
);

const AppNavigotor = createSwitchNavigator(
  {
    Home: HomeNavigation
  },
  {
    initialRouteName: "Home"
  }
);
export default AppNavigotor;
