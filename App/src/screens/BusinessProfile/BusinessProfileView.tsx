import { useNavigation, useRoute } from "@react-navigation/core";
import { BarCodeScanner, PermissionStatus } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PrimaryButton, PlainButton } from "./components";

export default function BusinessProfileView() {
  const navigation = useNavigation();
  const route = useRoute();

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

  const navigateToQRScanner = () => {
    if (hasDeniedCameraPermission) {
      alert(`Please go to your settings and give expo camera permissions.`);
    } else {
      navigation.navigate("QRScanner");
    }
  };

  const navigateToManuallyLog = () => {
    navigation.navigate("ManuallyLog");
  };

  const signOut = () => {
    navigation.navigate("Onboarding");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.titleAndButtonContainer}>
          <Text style={styles.title}>My Business</Text>
          <PlainButton title="Sign out" onPress={signOut} />
        </View>
        <Text>Dirty Bird Waffles</Text>
        <Text>150 Elgin St.</Text>
        <Text>
          {JSON.stringify(
            route.params === undefined ? { user: undefined } : route.params
          )}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title="Scan customers" onPress={navigateToQRScanner} />
        <PrimaryButton
          title="Manually log customers"
          onPress={navigateToManuallyLog}
        />
      </View>
    </SafeAreaView>
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
