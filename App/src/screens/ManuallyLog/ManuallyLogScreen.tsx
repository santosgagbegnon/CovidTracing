import React from "react";
import { StyleSheet } from "react-native";
import { ScreenView } from "../../shared/components";
import ManuallyLogView from "./ManuallyLogView";

export default function ManuallyLogScreen() {
  return (
    <ScreenView style={styles.screenView}>
      <ManuallyLogView />
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
