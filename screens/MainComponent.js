import { Platform, StyleSheet, View, Text, Image } from "react-native";
import { Icon } from "react-native-elements";
import Constants from "expo-constants";
import { createStackNavigator } from "@react-navigation/stack";
import DirectoryScreen from "./DirectoryScreen";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPartners } from "../features/partners/partnersSlice";
import { fetchComments } from "../features/comments/commentsSlice";
import { fetchPromotions } from "../features/promotions/promotionsSlice";
import { fetchCampsites } from "../features/campsites/campsitesSlice";
import { logo } from "../assets/images/logo.png";

const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#5637DD" },
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image source={logo} style={styles.drawerImage} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>NuCamp</Text>
        </View>
      </View>
      <DrawerItemList {...props} labelStyle={{ fontWeight: "bold" }} />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "Home",
          headerLeft: () => (
            <Icon
              name="home"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const AboutNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="info-circle"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const ContactNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={({ navigation }) => ({
          title: "Contact Us",
          headerLeft: () => (
            <Icon
              name="address-card"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
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
        options={({ navigation }) => ({
          title: "Campsite Directory",
          headerLeft: () => (
            <Icon
              name="list"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCampsites());
    dispatch(fetchPromotions());
    dispatch(fetchPartners());
    dispatch(fetchComments());
  }, [dispatch]);
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
        drawerContent={CustomDrawerContent}
      >
        <Drawer.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            title: "Home",
            drawerIcon: ({ color }) => (
              <Icon
                name="home"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="Directory"
          component={DirectoryNavigator}
          options={{
            title: "Directory",
            drawerIcon: ({ color }) => (
              <Icon
                name="list"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="About"
          component={AboutNavigator}
          options={{
            title: "About",
            drawerIcon: ({ color }) => (
              <Icon
                name="info-circle"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="Contact"
          component={ContactNavigator}
          options={{
            title: "Contact Us",
            drawerIcon: ({ color }) => (
              <Icon
                name="address-card"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        ></Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24,
  },
  drawerHeader: {
    backgroundColor: "#5637DD",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 5,
    height: 30,
    width: 30,
  },
});
export default Main;
