import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { OnboardingScreen } from "../screens/Onboarding";
import PersonalSignUpNavigator from "./PersonalSignUpNavigator";
import SignIn from "../screens/SignIn";
import BusinessSignUpNavigator from "./BusinessSignUpNavigator";
import { PersonalProfileScreen } from "../screens/PersonalProfile";
import BusinessTabNav from "./BusinessTabNav";
import { useSignInStatus } from "../context/SignInContext";
import PersonalTabNav from "./PersonalTabNav";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isSignedIn, userInfo } = useSignInStatus();

  const unAuthScreens = (
    <>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />

      <Stack.Screen name="SignIn" component={SignIn} />

      <Stack.Screen name="BusinessSignUp" component={BusinessSignUpNavigator} />

      <Stack.Screen name="PersonalSignUp" component={PersonalSignUpNavigator} />
    </>
  );

  const authScreen =
    userInfo?.accountType === "business" ? ( //if userInfo exists and the accountType is business then provide me the businessProfile screen else the personalProfile screen
      <Stack.Screen name="BusinessHome" component={BusinessTabNav} />
    ) : (
      <Stack.Screen name="PersonalHome" component={PersonalTabNav} />
    );

  return (
    <Stack.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: route.name === "SignIn" ? true : false,
          headerTitle: "",
        };
      }}
    >
      {isSignedIn.signInStatus && userInfo //if signInStatus is true and userInfo is not undefined the give me the appropriate auth screen
        ? authScreen
        : unAuthScreens}
    </Stack.Navigator>
  );
}
