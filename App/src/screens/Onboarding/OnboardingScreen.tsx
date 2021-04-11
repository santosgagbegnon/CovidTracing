import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenView } from "../../shared/components";
import OnboardingView from "./OnboardingView";

export default function OnboardingScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "stretch",
        justifyContent: "flex-start",
      }}
    >
      <OnboardingView />
    </SafeAreaView>
  );
}
