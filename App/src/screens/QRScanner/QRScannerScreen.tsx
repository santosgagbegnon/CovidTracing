import React from "react";
import { StyleSheet, View } from "react-native";
import QRScannerView from "./QRScannerView";

export default function QRScannerScreen() {
  return (
    <View style={styles.screenView}>
      <QRScannerView />
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
