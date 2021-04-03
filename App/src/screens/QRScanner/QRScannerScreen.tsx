import React from "react";
import { StyleSheet, View } from "react-native";
import {useSignInStatus} from "../../context/SignInContext";
import QRScannerView from "./QRScannerView";

export default function QRScannerScreen() {
  const {userInfo} = useSignInStatus()

  return (
    <View style={styles.screenView}>
      <QRScannerView businessID={userInfo?.id ?? ''}/>
    </View>
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
