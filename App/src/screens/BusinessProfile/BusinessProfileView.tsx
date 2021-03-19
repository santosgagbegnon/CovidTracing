import { useNavigation } from "@react-navigation/core";
import { BarCodeScanner, PermissionStatus } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PrimaryButton, PlainButton } from "./components";

export default function BusinessProfileView() {
  const navigation = useNavigation();

  const [
    hasDeniedCameraPermission,
    setHasDeniedCameraPermission,
  ] = useState<boolean>();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasDeniedCameraPermission(status === PermissionStatus.DENIED);
    })();
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.titleAndButtonContainer}>
          <Text style={styles.title}>My Business</Text>
          <PlainButton title="Edit information" />
        </View>
        <Text>Dirty Bird Waffles</Text>
        <Text>150 Elgin St.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Scan customers"
          onPress={() => {
            if (hasDeniedCameraPermission) {
              alert(
                `Please go to your settings and give expo camera permissions.`
              );
            } else {
              navigation.navigate("QRScanner");
            }
          }}
        />
        <PrimaryButton title="Manually log customers" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
  },
  titleAndButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
});
