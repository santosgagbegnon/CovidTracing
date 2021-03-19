import React from "react";
import { StyleSheet } from "react-native";
import { ScreenView } from "../../shared/components/";
import BusinessProfileView from "./BusinessProfileView";

export default function BusinessProfileScreen() {
  return (
    <ScreenView style={styles.screenView}>
      <BusinessProfileView />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
