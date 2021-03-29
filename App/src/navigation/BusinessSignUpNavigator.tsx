import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  SignUpBusinessName,
  SignUpLocation,
  SignUpEmail,
  SignUpNumber,
  SignUpPassword,
} from "../screens/SignUp/BusinessSignUp";

const Stack = createStackNavigator();

export default function BusinessSignUpNavigator() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "",
      }}
    >
      <Stack.Screen name="SignUpBusinessName" component={SignUpBusinessName} />
      <Stack.Screen name="SignUpLocation" component={SignUpLocation} />
      <Stack.Screen name="SignUpEmail" component={SignUpEmail} />
      <Stack.Screen name="SignUpNumber" component={SignUpNumber} />
      <Stack.Screen name="SignUpPassword" component={SignUpPassword} />
    </Stack.Navigator>
  );
}
//
