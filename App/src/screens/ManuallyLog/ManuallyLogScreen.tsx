import React from "react";
import { StyleSheet } from "react-native";
import { useSignInStatus } from "../../context/SignInContext";
import { ScreenView } from "../../shared/components";
import ManuallyLogView from "./ManuallyLogView";

export default function ManuallyLogScreen() {
  const { userInfo } = useSignInStatus();

  return (
    <ScreenView style={styles.screenView}>
      <ManuallyLogView businessID={userInfo?.id ?? ""} />
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
