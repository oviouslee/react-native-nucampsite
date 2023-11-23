import { Platform, View } from "react-native";
import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";
import DirectoryScreen from "./DirectoryScreen";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import HomeScreen from "./HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";

const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#5637DD" },
};

const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const DirectoryNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Directory" screenOptions={screenOptions}>
      <Stack.Screen
        name="Directory"
        component={DirectoryScreen}
        options={{ title: "Campsite Directory" }}
      ></Stack.Screen>
      <Stack.Screen
        name="CampsiteInfo"
        component={CampsiteInfoScreen}
        options={({ route }) => ({ title: route.params.campsite.name })}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const Main = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{ backgroundColor: "#CEC8FF" }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeNavigator}
          options={{ title: "Home" }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="Directory"
          component={DirectoryNavigator}
          options={{ title: "Directory" }}
        ></Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

export default Main;