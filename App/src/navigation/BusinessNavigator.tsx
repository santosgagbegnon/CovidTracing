import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { BusinessProfileScreen } from "../screens/BusinessProfile";
import { TemporaryHomeScreen } from "../screens/TemporaryHome";
import { QRScannerScreen } from "../screens/QRScanner";
import { BackButton } from "../shared/components/BackButton/BackButton";
import { ManuallyLogScreen } from "../screens/ManuallyLog";

const Stack = createStackNavigator();

export default function BusinessNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BusinessProfile"
        component={BusinessProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManuallyLog"
        component={ManuallyLogScreen}
        options={{ title: "Log Customers" }}
      />
      <Stack.Screen
        name="QRScanner"
        component={QRScannerScreen}
        options={({ navigation }) => {
          return {
            title: "",
            headerTransparent: true,
            headerLeft: () => {
              return (
                <BackButton
                  onPress={() => {
                    if (navigation.canGoBack()) navigation.goBack();
                  }}
                />
              );
            },
          };
        }}
      />
    </Stack.Navigator>
  );
}
