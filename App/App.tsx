import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TemporaryHomeScreen } from "./src/screens/TemporaryHome";
import { createStackNavigator } from "@react-navigation/stack";
import BusinessNavigator from "./src/navgiation/BusinessNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { CustomerHistoryScreen } from "./src/screens/CustomerHistory";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TemporaryHome" component={TemporaryHomeScreen} />
      <Stack.Screen name="Business" component={BusinessNavigator} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            tabBarVisible: getFocusedRouteNameFromRoute(route) !== "QRScanner",
          };
        }}
      >
        <Tab.Screen
          name="Home"
          component={BusinessNavigator}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => {
              return (
                <Ionicons color={color} size={size} name="person-circle" />
              );
            },
          }}
        />
        <Tab.Screen
          name="Customers"
          component={CustomerHistoryScreen}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Ionicons color={color} size={size} name="list-outline" />;
            },
          }}
        />
      </Tab.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
