import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { BusinessProfileScreen } from "../screens/BusinessProfile";
import { TemporaryHomeScreen } from "../screens/TemporaryHome";
import { QRScannerScreen } from "../screens/QRScanner";

const Stack = createStackNavigator();

export default function BusinessNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TemporaryHome" component={TemporaryHomeScreen} />
      <Stack.Screen name="BusinessProfile" component={BusinessProfileScreen} />
      <Stack.Screen name="QRScanner" component={QRScannerScreen} />
    </Stack.Navigator>
  );
}
