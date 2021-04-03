import React from "react";
import { StyleSheet } from "react-native";
import { useSignInStatus } from "../../context/SignInContext";
import { ScreenView } from "../../shared/components/";
import PersonalProfileView from "./PersonalProfileView";

export default function PersonalProfileScreen() {
  const { userInfo } = useSignInStatus();

  const props = {
    firstName: userInfo?.firstname ?? "",
    lastName: userInfo?.lastname ?? "",
    email: userInfo?.email ?? "",
    phoneNumber: userInfo?.phonenumber ?? "",
    id: userInfo?.id,
  };

  return (
    <ScreenView style={styles.screenView}>
      <PersonalProfileView {...props} />
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
