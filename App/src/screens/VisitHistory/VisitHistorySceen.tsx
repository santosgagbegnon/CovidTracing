import React from "react";
import { StyleSheet } from "react-native";
import { useSignInStatus } from "../../context/SignInContext";
import { ScreenView } from "../../shared/components";
import { VisitHistoryView } from "./VisitHistoryView";

export default function VisitHistoryScreen() {
  const { userInfo } = useSignInStatus();

  return (
    <ScreenView style={styles.screenView}>
      <VisitHistoryView customerID={userInfo?.id ?? ""} />
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
