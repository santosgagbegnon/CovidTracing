import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppNavigator from "./src/navigation/AppNavigator";
import { SignInProvider } from "./src/context/SignInContext";
import Toast from "react-native-toast-message";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <React.Fragment>
      {
    <SignInProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SignInProvider>}
    <Toast ref={(ref) => Toast.setRef(ref)} />
    </React.Fragment>
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
