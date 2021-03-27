import React from "react";
import { StyleSheet } from "react-native";
import { ScreenView } from "../../shared/components";
import { CustomerHistoryView } from "./CustomerHistoryView";

export default function CustomersScreen() {
  return (
    <ScreenView style={styles.screenView}>
      <CustomerHistoryView />
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
