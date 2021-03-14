import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { BusinessProfileScreen } from "../screens/BusinessProfile";
import { TemporaryHomeScreen } from "../screens/TemporaryHome";

const Stack = createStackNavigator();

export default function BusinessNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TemporaryHome" component={TemporaryHomeScreen} />

      <Stack.Screen name="BusinessProfile" component={BusinessProfileScreen} />
    </Stack.Navigator>
  );
}
