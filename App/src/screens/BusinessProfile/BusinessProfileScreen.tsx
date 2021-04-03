import React from "react";
import { StyleSheet } from "react-native";
import { useSignInStatus } from "../../context/SignInContext";
import { ScreenView } from "../../shared/components/";
import BusinessProfileView from "./BusinessProfileView";

export default function BusinessProfileScreen() {
  const { userInfo } = useSignInStatus();

  const businessName = userInfo?.businessname ?? "";
  const businessLocation = userInfo?.location ?? "";

  return (
    <ScreenView style={styles.screenView}>
      <BusinessProfileView name={businessName} location={businessLocation} />
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
