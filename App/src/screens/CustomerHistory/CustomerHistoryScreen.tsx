import React from "react";
import { StyleSheet } from "react-native";
import { useSignInStatus } from "../../context/SignInContext";
import { ScreenView } from "../../shared/components";
import { CustomerHistoryView } from "./CustomerHistoryView";

export default function CustomersScreen() {
  const { userInfo } = useSignInStatus();

  return (
    <ScreenView style={styles.screenView}>
      <CustomerHistoryView businessID={userInfo?.id ?? ""} />
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
