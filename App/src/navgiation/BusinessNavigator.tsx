import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { BusinessProfileScreen } from "../screens/BusinessProfile";
import { TemporaryHomeScreen } from "../screens/TemporaryHome";
import { QRScannerScreen } from "../screens/QRScanner";
import { BackButton } from "../shared/components/BackButton/BackButton";

const Stack = createStackNavigator();

export default function BusinessNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TemporaryHome" component={TemporaryHomeScreen} />
      <Stack.Screen name="BusinessProfile" component={BusinessProfileScreen} />
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
