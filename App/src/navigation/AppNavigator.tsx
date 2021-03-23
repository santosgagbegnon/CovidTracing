import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { OnboardingScreen } from "../screens/Onboarding";
import  PersonalSignUpNavigator from './PersonalSignUpNavigator';
import  SignIn from '../screens/SignIn';
import BusinessSignUpNavigator from "./BusinessSignUpNavigator";
import { PersonalProfileScreen } from "../screens/PersonalProfile";
import BusinessTabNav from "./BusinessTabNav";


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />

      <Stack.Screen name="SignIn" component={SignIn} / >

      <Stack.Screen name="BusinessHome" component={BusinessTabNav} />

      <Stack.Screen name="BusinessSignUp" component={BusinessSignUpNavigator} />

      <Stack.Screen name="PersonalHome" component={ PersonalProfileScreen } /> 

      <Stack.Screen name="PersonalSignUp" component={ PersonalSignUpNavigator } /> 

      
    </Stack.Navigator>
  );
}
